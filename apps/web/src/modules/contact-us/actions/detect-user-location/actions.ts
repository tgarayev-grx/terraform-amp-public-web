"use server";

import { headers } from "next/headers";
import { getClientIpFromHeaders } from "./headers";
import { IPInfoAPI } from "./ip-info.api";
import { COUNTRY_CODES } from "../../config/countries";

/** Returns ISO 3166-1 alpha-2 country code from request IP, or null. Uses x-forwarded-for and ipinfo.io. */
export async function getUserCountryCode(): Promise<string | null> {
  try {
    const headersList = await headers();
    const ip = getClientIpFromHeaders(headersList);

    if (!ip) {
      return null;
    }

    const api = new IPInfoAPI();
    const data = await api.detectLocation(ip);

    if (!data) {
      return null;
    }

    const countryCode = data.country_code.toUpperCase();

    if (!COUNTRY_CODES.includes(countryCode)) {
      console.error(
        "[getDetectedCountry] Unsupported country code",
        countryCode
      );
      return null;
    }

    return countryCode;
  } catch (error) {
    console.error("[getDetectedCountry]", error);
    return null;
  }
}
