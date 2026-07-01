/**
 * One-off backfill: re-scans every stored visitor and re-classifies bots using
 * the same multi-signal logic as lib/visitor.ts (datacenter IP / proxy / UA).
 *
 * Run:  npx tsx scripts/backfill-bots.ts
 *
 * ip-api.com free tier = 45 requests/min, so unique IPs are throttled.
 */
import "dotenv/config";
import { db } from "../lib/db";
import { visitors } from "../lib/db/schema";
import { eq } from "drizzle-orm";

const UA_BOT =
  /bot|crawl|spider|slurp|scrape|curl|wget|python|java(?!script)|ruby|perl|php|go-http|okhttp|axios|node-fetch|got \(|libwww|httpclient|http[-_]client|winhttp|urllib|aiohttp|guzzle|phantom|headless|puppeteer|playwright|selenium|lighthouse|pagespeed|pingdom|uptime|statuscake|newrelic|datadog|monitor|preview|facebookexternalhit|whatsapp|telegrambot|discordbot|slackbot|twitterbot|linkedinbot|embedly|feedfetcher|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|gptbot|claudebot|anthropic|ccbot|amazonbot|dataforseo|censys|masscan|zgrab|nmap|shodan/i;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function lookup(ip: string) {
  const fields =
    "status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp,org,as,asname,mobile,proxy,hosting,query";
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=${fields}`);
    return await res.json();
  } catch {
    return {};
  }
}

async function main() {
  const rows = await db.select().from(visitors);
  console.log(`Loaded ${rows.length} rows.`);

  const uniqueIps = [...new Set(rows.map((r) => r.ip))];
  console.log(`Unique IPs: ${uniqueIps.length}. Estimated time ~${Math.ceil((uniqueIps.length * 1.4) / 60)} min.`);

  const geoByIp = new Map<string, any>();
  for (const ip of uniqueIps) {
    if (ip === "127.0.0.1" || ip === "::1") {
      geoByIp.set(ip, { status: "local" });
      continue;
    }
    geoByIp.set(ip, await lookup(ip));
    await sleep(1400); // stay under 45/min
  }

  let flagged = 0;
  for (const row of rows) {
    const data = geoByIp.get(row.ip) || {};
    const geoOk = data.status === "success";
    const ua = (row.userAgent || "").toLowerCase();
    const isLocalhost = row.ip === "127.0.0.1" || row.ip === "::1";
    const hasBrowser = !!row.browser && row.browser !== "Unknown";
    const hasOs = !!row.os && row.os !== "Unknown";

    const reasons: string[] = [];
    if (!row.userAgent || row.userAgent === "Unknown Device") reasons.push("empty-ua");
    else if (UA_BOT.test(ua)) reasons.push("ua-signature");
    if (geoOk && data.hosting === true) reasons.push("datacenter-ip");
    if (geoOk && data.proxy === true) reasons.push("proxy-vpn");
    if (!hasBrowser && !hasOs && !isLocalhost) reasons.push("no-browser-signature");

    const isBot = reasons.length > 0;
    if (isBot) flagged++;

    await db
      .update(visitors)
      .set({
        isBot,
        botReason: reasons.length ? reasons.join(",") : null,
        isHosting: geoOk ? !!data.hosting : false,
        isProxy: geoOk ? !!data.proxy : false,
        isMobile: geoOk ? !!data.mobile : false,
        asName: geoOk ? data.asname || data.as || row.asName : row.asName,
        org: geoOk ? data.org || data.isp || row.org : row.org,
      })
      .where(eq(visitors.id, row.id));
  }

  console.log(`Done. Flagged ${flagged}/${rows.length} rows as bots.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
