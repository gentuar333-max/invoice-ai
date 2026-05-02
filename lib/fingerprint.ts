 
// lib/fingerprint.ts
// Gjeneron fingerprint unike nga browser pa library te jashtem

export function generateFingerprint(): string {
  const nav = window.navigator;
  const screen = window.screen;

  const components = [
    nav.userAgent,
    nav.language,
    nav.languages?.join(",") || "",
    String(screen.width),
    String(screen.height),
    String(screen.colorDepth),
    String(new Date().getTimezoneOffset()),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    String(nav.hardwareConcurrency || ""),
    String((nav as any).deviceMemory || ""),
    nav.platform || "",
    String(nav.cookieEnabled),
    // Canvas fingerprint
    getCanvasFingerprint(),
  ];

  const raw = components.join("|");
  return hashString(raw);
}

function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("InvoiceAgent🔒", 2, 2);
    return canvas.toDataURL().slice(-50);
  } catch {
    return "";
  }
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  // Convert to positive hex string
  return Math.abs(hash).toString(16).padStart(8, "0") +
    Math.abs(hash * 2654435761).toString(16).padStart(8, "0");
}