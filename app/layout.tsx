import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "Arinjay Bhola | Portfolio",
  description: "Full Stack Developer focused on building clean, scalable, and user-centric web applications.",
};

import { trackVisitor } from "../lib/visitor";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await trackVisitor();

  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
