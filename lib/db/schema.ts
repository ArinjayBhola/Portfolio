import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  ip: varchar("ip", { length: 45 }).notNull(),
  city: text("city"),
  region: text("region"),
  country: text("country"),
  loc: text("loc"),
  org: text("org"),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});
