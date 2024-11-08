import {
  AllTimeStats,
  ReadStats,
  WakatimeResponse,
} from "@/common/utils/types";
import querystring from "querystring";

const client_id = process.env.WAKATIME_CLIENT_ID;
const client_secret = process.env.WAKATIME_CLIENT_SECRET;
const refresh_token = process.env.WAKATIME_CLIENT_REFRESH_TOKEN;

const STATS_ENDPOINT = "https://wakatime.com/api/v1/users/current/stats";
const ALL_TIME_SINCE_TODAY =
  "https://wakatime.com/api/v1/users/current/all_time_since_today";
const TOKEN_ENDPOINT = "https://wakatime.com/oauth/token";

// Module-level cache variables
let cachedAccessToken: string | null = null;
let tokenExpiry: number | null = null; // Unix timestamp in seconds

/**
 * Fetches a new access token using the refresh token.
 * Implements in-memory caching to reuse the token until it expires.
 * @returns {Promise<string>} The access token.
 */
export const getAccessToken = async (): Promise<string> => {
  try {
    const currentTime = Math.floor(Date.now() / 1000);

    if (cachedAccessToken && tokenExpiry && currentTime < tokenExpiry) {
      console.log("Using cached access token.");
      return cachedAccessToken;
    }

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        client_id,
        client_secret,
        refresh_token,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error getting access token", errorText);
      throw new Error("Error getting access token");
    }

    const responseBody = await response.text();
    const params = new URLSearchParams(responseBody);
    const access_token = params.get("access_token")?.trim();
    const expires_in = Number(params.get("expires_in"));

    if (!access_token) {
      console.error("Access token not found in the response.");
      throw new Error("Access token not found in the response.");
    }

    if (expires_in && !isNaN(expires_in)) {
      tokenExpiry = currentTime + expires_in - 60; // Subtract 60 seconds as a buffer
    } else {
      tokenExpiry = currentTime + 3600; // Default to 1 hour if expires_in is missing or invalid
      console.warn(
        "Expires_in not found or invalid. Setting default expiry of 1 hour."
      );
    }

    // Cache the access token
    cachedAccessToken = access_token;
    console.log("Access token obtained and cached successfully.");

    return access_token;
  } catch (error) {
    console.error("Exception in getAccessToken:", error);
    throw error;
  }
};

/**
 * Fetches read stats (last 7 days) from Wakatime.
 * @returns {Promise<WakatimeResponse>} The read stats data.
 */
export const getReadStats = async (): Promise<WakatimeResponse> => {
  try {
    const access_token = await getAccessToken();

    const request = await fetch(`${STATS_ENDPOINT}/last_7_days`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const status = request.status;

    if (status >= 400) {
      const errorText = await request.text();
      console.error("Error fetching read stats:", errorText);
      return { status, data: {} };
    }

    const getData = await request.json();

    const data: ReadStats = {
      last_update: getData?.data?.modified_at,
      start_date: getData?.data?.start,
      end_date: getData?.data?.end,
      categories: getData?.data?.categories,
      best_day: {
        date: getData?.data?.best_day?.date,
        text: getData?.data?.best_day?.text,
      },
      human_readable_daily_average:
        getData?.data?.human_readable_daily_average_including_other_language,
      human_readable_total:
        getData?.data?.human_readable_total_including_other_language,
      languages: getData?.data?.languages?.slice(0, 3) || [],
      editors: getData?.data?.editors || [],
    };

    return {
      status,
      data,
    };
  } catch (error) {
    console.error("Exception in getReadStats:", error);
    return { status: 500, data: {} };
  }
};

/**
 * Fetches all-time stats since today from Wakatime.
 * @returns {Promise<WakatimeResponse>} The all-time stats data.
 */
export const getALLTimeSinceToday = async (): Promise<WakatimeResponse> => {
  try {
    const access_token = await getAccessToken();

    const request = await fetch(ALL_TIME_SINCE_TODAY, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const status = request.status;

    if (status > 400) {
      const errorText = await request.text();
      console.error("Error fetching all-time stats:", errorText);
      return { status, data: {} };
    }

    const getData = await request.json();

    const data: AllTimeStats = {
      text: getData?.data?.text,
      total_seconds: getData?.data?.total_seconds,
    };

    return {
      status,
      data,
    };
  } catch (error) {
    console.error("Exception in getALLTimeSinceToday:", error);
    return { status: 500, data: {} };
  }
};
