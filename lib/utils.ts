import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

export function formatDate(date: Date | string) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'long' });
  const year = d.getFullYear();
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export function parseUserAgent(ua: string | null) {
  if (!ua) return "Unknown Device";
  
  const platforms = [
    { name: "Windows", regex: /Windows/ },
    { name: "Mac", regex: /Macintosh|Mac OS X/ },
    { name: "Linux", regex: /Linux/ },
    { name: "Android", regex: /Android/ },
    { name: "iOS", regex: /iPhone|iPad|iPod/ },
  ];

  const browsers = [
    { name: "Chrome", regex: /Chrome|CriOS/ },
    { name: "Firefox", regex: /Firefox|FxiOS/ },
    { name: "Safari", regex: /Safari/ },
    { name: "Edge", regex: /Edge|Edg/ },
    { name: "Opera", regex: /Opera|OPR/ },
  ];

  const platform = platforms.find(p => p.regex.test(ua))?.name || "Unknown OS";
  const browser = browsers.find(b => b.regex.test(ua))?.name || "Unknown Browser";

  return `${browser} on ${platform}`;
}
