import { db } from "./db";
import { visitors } from "./db/schema";
import { headers } from "next/headers";

export async function trackVisitor() {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

    if (data.status === "success") {
      await db.insert(visitors).values({
        ip: ip,
        city: data.city,
        region: data.regionName,
        country: data.country,
        loc: `${data.lat},${data.lon}`,
        org: data.isp,
      });
    } else {
      await db.insert(visitors).values({
        ip: ip,
      });
    }
  } catch (error) {
    console.error("Error tracking visitor:", error);
  }
}
