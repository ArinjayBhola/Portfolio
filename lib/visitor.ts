import { db } from "./db";
import { visitors } from "./db/schema";
import { headers, cookies } from "next/headers";
import { UAParser } from "ua-parser-js";

export async function trackVisitor() {
  try {
    const headersList = await headers();
    const cookieStore = await cookies();
    
    // 1. Manage Visitor ID (Retention)
    let visitorId = cookieStore.get("visitor_id")?.value;
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      try {
        cookieStore.set("visitor_id", visitorId, { 
          maxAge: 60 * 60 * 24 * 365, // 1 year
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production"
        });
      } catch (e) {
        // Silently fail if cookie cannot be set (e.g. in a read-only context)
      }
    }

    // 2. Extract Basic Info
    const forwardedFor = headersList.get("x-forwarded-for");
    const userAgent = headersList.get("user-agent") || "Unknown Device";
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";
    
    // 2. Enhanced Referrer Capture
    const rawReferrer = headersList.get("referer") || headersList.get("Referer") || "Direct";
    const referrer = rawReferrer.trim() || "Direct";

    const host = headersList.get("host");
    const path = referrer.includes(host || "") ? new URL(referrer).pathname : "/";

    // 3. User Agent Parsing
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    const hasBrowser = !!result.browser.name;
    const hasOs = !!result.os.name;
    const browser = hasBrowser
      ? `${result.browser.name} ${result.browser.version || ""}`.trim()
      : "Unknown";
    const os = hasOs
      ? `${result.os.name} ${result.os.version || ""}`.trim()
      : "Unknown";
    const device = result.device.type || "desktop";

    // 4. Geolocation + network intelligence (request hosting/proxy/mobile flags)
    const geoFields =
      "status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp,org,as,asname,mobile,proxy,hosting,query";
    let data: any = {};
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}?fields=${geoFields}`);
      data = await response.json();
    } catch {
      data = {};
    }
    const geoOk = data.status === "success";

    // 5. Strong, multi-signal bot detection.
    // The single strongest signal is a datacenter/hosting IP — real humans do
    // not browse from AWS/GCP/Azure/Hetzner/DigitalOcean ranges.
    const ua = userAgent.toLowerCase();
    const isLocalhost = ip === "127.0.0.1" || ip === "::1";

    const uaBotPattern =
      /bot|crawl|spider|slurp|scrape|curl|wget|python|java(?!script)|ruby|perl|php|go-http|okhttp|axios|node-fetch|got \(|libwww|httpclient|http[-_]client|winhttp|urllib|aiohttp|guzzle|phantom|headless|puppeteer|playwright|selenium|lighthouse|pagespeed|pingdom|uptime|statuscake|newrelic|datadog|monitor|preview|facebookexternalhit|whatsapp|telegrambot|discordbot|slackbot|twitterbot|linkedinbot|embedly|feedfetcher|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|gptbot|claudebot|anthropic|ccbot|amazonbot|dataforseo|censys|masscan|zgrab|nmap|shodan/i;

    const reasons: string[] = [];
    if (!userAgent || userAgent === "Unknown Device") reasons.push("empty-ua");
    else if (uaBotPattern.test(ua)) reasons.push("ua-signature");
    if (geoOk && data.hosting === true) reasons.push("datacenter-ip");
    if (geoOk && data.proxy === true) reasons.push("proxy-vpn");
    // A real browser always resolves both browser AND OS. Neither => automated client.
    if (!hasBrowser && !hasOs && !isLocalhost) reasons.push("no-browser-signature");

    const isBot = reasons.length > 0;
    const botReason = reasons.length ? reasons.join(",") : null;

    console.log(
      `[ANALYTICS] ${ip} | ${geoOk ? data.city + ", " + data.country : "geo?"} | net: ${
        geoOk ? data.asname || data.isp : "?"
      } | ${isBot ? "BOT[" + botReason + "]" : "HUMAN"}`
    );

    const visitorData: any = {
      visitorId,
      ip,
      userAgent,
      browser,
      os,
      device,
      referrer,
      path,
      isBot,
      botReason,
      isHosting: geoOk ? !!data.hosting : false,
      isProxy: geoOk ? !!data.proxy : false,
      isMobile: geoOk ? !!data.mobile : false,
    };

    if (geoOk) {
      visitorData.city = data.city;
      visitorData.region = data.regionName;
      visitorData.country = data.country;
      visitorData.loc = `${data.lat},${data.lon}`;
      visitorData.org = data.org || data.isp;
      visitorData.asName = data.asname || data.as || null;
    }

    await db.insert(visitors).values(visitorData);
  } catch (error) {
    console.error("Error tracking visitor:", error);
  }
}
