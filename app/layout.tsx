import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../lib/theme-provider";

export const metadata: Metadata = {
  title: "Arinjay Bhola | Portfolio",
  description: "Full Stack Developer focused on building clean, scalable, and user-centric web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
