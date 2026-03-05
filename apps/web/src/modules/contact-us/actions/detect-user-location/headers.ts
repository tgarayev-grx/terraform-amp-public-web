export function getClientIpFromHeaders(headers: Headers): string | null {
  try {
    const forwarded = headers.get("x-forwarded-for");

    if (!forwarded) {
      console.error("[getClientIpFromHeaders] No forwarded IP found");
      return null;
    }

    const ip = forwarded.split(",")[0]?.trim();

    if (!ip) {
      console.error("[getClientIpFromHeaders] No IP found in forwarded header");
      return null;
    }

    return ip;
  } catch (error) {
    console.error("[getClientIpFromHeaders] Failed to get client IP", error);
    return null;
  }
}
