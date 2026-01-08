import React, { ReactNode, useEffect, useState, useMemo } from "react";

import { clsx, type ClassValue } from "clsx";

import { extendTailwindMerge } from "tailwind-merge";

import { IconsProps, Icons } from "@/ components/common/Icons";
// import { Icons, IconsProps } from "@/ components/common";

/**
 * PERFORMANCE OPTIMIZATION: Create customTwMerge once at module load
 * This avoids recreating the merge function on every call
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-xxs",
        "text-xs",
        "text-small",
        "text-sm",
        "text-base",
        "text-lg",
        "text-xl",
        "text-2xl",
        "text-3xl",
        "text-4xl",
        "text-5xl",
        "text-6xl",
        "text-7xl",
        "text-8xl",
        "text-9xl",
        "text-10xl",
        "text-hero",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-h5",
        "text-h6",
        "text-body",
        "text-body1",
        "text-regular",
      ],
    },
  },
});

export const generateDeviceId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

// Optimized cn function - uses pre-created customTwMerge
export const cn = (...inputs: ClassValue[]) => customTwMerge(clsx(inputs));

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export const labelIdTrim = (label?: string) =>
  label?.toLowerCase().replaceAll(" ", "-");

export const phoneTelFormat = (phone: string) =>
  phone.replace(/[-()+\s]/g, "");

/**
 * Countdown timer
 */
export const Countdown = ({
  initialMinutes = 1,
  initialSeconds = 59,
  resetKey,
}: {
  initialMinutes: number;
  initialSeconds: number;
  resetKey?: string | number;
}) => {
  const computeInitial = () => initialMinutes * 60 + initialSeconds;
  const [totalSeconds, setTotalSeconds] = useState(computeInitial);
  const [currentResetKey, setCurrentResetKey] = useState(resetKey);

  if (resetKey !== currentResetKey) {
    setCurrentResetKey(resetKey);
    setTotalSeconds(computeInitial());
  }

  const formattedTime = useMemo(() => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [totalSeconds]);

  useEffect(() => {
    if (totalSeconds <= 0) return;
    const interval = setInterval(() => {
      setTotalSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [totalSeconds]);

  return formattedTime;
};

// CSV parsing
export const parseCSV = (csvData: string) => {
  const rows = csvData.trim().split("\n");
  const headers = rows[0].split(",");
  return rows.slice(1).map((row) => {
    const values = row.split(",");
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => (obj[header.trim()] = values[index].trim()));
    return obj;
  });
};

// Check path match (generic, no Next.js)
export const matchesPath = (
  pathname: string,
  exactRoutes: string[],
  dynamicRoutes: string[]
): boolean =>
  exactRoutes.includes(pathname) || dynamicRoutes.some((r) => pathname.startsWith(r));

// Time formatting
export const timeFormat = (value: string): string => {
  if (!value) return "";
  const time12Match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (time12Match) {
    let hours = parseInt(time12Match[1], 10);
    const minutes = time12Match[2];
    const period = time12Match[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${minutes}`;
  }
  const time24Match = value.match(/^(\d{1,2}):(\d{2})$/);
  if (time24Match) {
    let hours = parseInt(time24Match[1], 10);
    const minutes = time24Match[2];
    return `${String(hours).padStart(2, "0")}:${minutes}`;
  }
  return "";
};

export const formatTimeInto24 = (time?: string): string => {
  if (!time) return "";
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return "";
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
};

export function formatEventEndTime(eventTime: string, eventDuration: number) {
  const match = eventTime.match(/^(\d{2}):(\d{2}):(\d{2})$/);
  if (!match) return "";
  let hours = parseInt(match[1], 10);
  let minutes = parseInt(match[2], 10) + eventDuration;
  hours += Math.floor(minutes / 60);
  minutes %= 60;
  hours %= 24;
  const period = hours >= 12 ? "PM" : "AM";
  let displayHours = hours % 12 || 12;
  return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export const generateGoogleCalendarLink = (data: {
  event_date?: string;
  title?: string;
  description?: string;
  event_link?: string;
}) => {
  let formattedStartDate = "";
  if (data.event_date) {
    const date = new Date(data.event_date);
    if (!isNaN(date.getTime())) {
      formattedStartDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    }
  }
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.title ?? "")}&dates=${formattedStartDate}/${formattedStartDate}&details=${encodeURIComponent(data.description ?? "")}&location=${encodeURIComponent(data.event_link ?? "")}`;
};

// Filter website
export const filterWebsiteLink = (websiteLink: string) => {
  const cleanedLink = websiteLink.replace(/\/$/, "");
  const validDomains = [".com", ".net", ".co", ".org", ".io", ".gov", ".edu", ".biz", ".info", ".tv"];
  return validDomains.some((d) => cleanedLink.endsWith(d)) ? cleanedLink : null;
};

// Image compression
export async function compressImage(file: File, maxSizeMB = 5): Promise<File> {
  if (file.size / 1024 / 1024 <= maxSizeMB) return file;
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  ctx.drawImage(imageBitmap, 0, 0);
  const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.7));
  return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" });
}

// FormData conversion
export const convertDataToFormData = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value === undefined || value === null) return;
    if (value instanceof File) formData.append(key, value, value.name);
    else if (Array.isArray(value)) value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
    else formData.append(key, String(value));
  });
  return formData;
};

// Number & currency formatting
export const formatNumber = (value: string): number | string => {
  if (!value) return "";
  const num = Number(value.replace(/[^\d.-]/g, ""));
  return isNaN(num) ? 0 : new Intl.NumberFormat().format(num);
};

export function formatCurrency(num: number | string) {
  if (typeof num === "string") num = Number(num.replace(/,/g, "").trim());
  if (isNaN(num)) return "";
  const thresholds = [
    { value: 1e24, label: "Septillion" },
    { value: 1e21, label: "Sextillion" },
    { value: 1e18, label: "Quintillion" },
    { value: 1e15, label: "Quadrillion" },
    { value: 1e12, label: "T" },
    { value: 1e9, label: "B" },
    { value: 1e6, label: "M" },
    { value: 1e3, label: "K" },
  ];
  for (const { value, label } of thresholds) if (num >= value) return ((num / value).toFixed(2).replace(/\.00$/, "") + label);
  return num.toLocaleString();
}

// Render icons
export const renderStartEndContent = (content: IconsProps | ReactNode) =>
  content && typeof content === "object" && "icon" in content ? (
    <Icons fontSize={25} className={cn("cursor-pointer", (content as IconsProps).className)} {...(content as IconsProps)} />
  ) : (
    content
  );

// Share link
export const shareLink = async (title: string, text: string, url?: string) => {
  const shareUrl = url || window.location.href;
  if (navigator.share) {
    try { await navigator.share({ title, text, url: shareUrl }); } catch {}
  } else {
    try { await navigator.clipboard.writeText(shareUrl); console.log('"Link copied!') } 
    catch { console.log('error'); }
  }
};

// Convert value to digits
export const convertIntoDigits = (value: string | number) =>
  typeof value === "number" ? value.toLocaleString() : Number(value).toLocaleString();

export function removeEmptyKeys<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== null && value !== "")) as Partial<T>;
}

// Utility: format comma list
export const formatCommaList = (items: string[]) => items.join(", ");

// Duration formatting
export const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0 ? (minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`) : `${minutes}m`;
};

// Debounce
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}
