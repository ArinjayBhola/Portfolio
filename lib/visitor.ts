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
    
    // Server-side debug log (Visible in terminal where npm run dev is running)
    console.log(`[ANALYTICS] Visit from ${ip} | Source: ${referrer} | UA: ${userAgent.slice(0, 30)}...`);
    
    const host = headersList.get("host");
    const path = referrer.includes(host || "") ? new URL(referrer).pathname : "/";

    // 3. User Agent Parsing
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    const browser = result.browser.name 
      ? `${result.browser.name} ${result.browser.version || ""}`.trim() 
      : "Unknown";
    const os = result.os.name 
      ? `${result.os.name} ${result.os.version || ""}`.trim() 
      : "Unknown";
    const device = result.device.type || "desktop";
    
    // 4. Bot Detection
    const isBot = /bot|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|sogou|exabot|facebot|ia_archiver/i.test(userAgent);

    // 5. Geolocation
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

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
    };

    if (data.status === "success") {
      visitorData.city = data.city;
      visitorData.region = data.regionName;
      visitorData.country = data.country;
      visitorData.loc = `${data.lat},${data.lon}`;
      visitorData.org = data.isp;
    }

    await db.insert(visitors).values(visitorData);
  } catch (error) {
    console.error("Error tracking visitor:", error);
  }
}
