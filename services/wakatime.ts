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

/**
 * Fetches a new access token using the refresh token.
 * Implements in-memory caching to reuse the token until it expires.
 * @returns {Promise<string>} The access token.
 */
export const getAccessToken = async (): Promise<string> => {
  try {
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

    if (!access_token) {
      console.error("Access token not found in the response.");
      throw new Error("Access token not found in the response.");
    }

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

    let responseData;
    let isUpToDate = false;
    let request;
    let status = 500;

    // Loop to retry fetching data until it's up-to-date
    while (!isUpToDate) {
      request = await fetch(`${STATS_ENDPOINT}/last_30_days`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      status = request.status;

      if (status >= 400) {
        const errorText = await request.text();
        console.error("Error fetching read stats:", errorText);
        return { status, data: {} };
      }

      responseData = await request.json();
      isUpToDate = responseData?.data?.is_up_to_date;

      // If data is not up to date, wait before retrying
      if (!isUpToDate) {
        console.log("Data is stale; retrying in 5 minutes...");
        await new Promise((resolve) => setTimeout(resolve, 300000)); // wait 5 minutes
      }
    }

    console.log(responseData);

    const data: ReadStats = {
      last_update: responseData?.data?.modified_at,
      start_date: responseData?.data?.start,
      end_date: responseData?.data?.end,
      range: responseData?.data?.range,
      categories: responseData?.data?.categories,
      best_day: {
        date: responseData?.data?.best_day?.date,
        text: responseData?.data?.best_day?.text,
      },
      human_readable_daily_average:
        responseData?.data
          ?.human_readable_daily_average_including_other_language,
      human_readable_total:
        responseData?.data?.human_readable_total_including_other_language,
      languages: responseData?.data?.languages?.slice(0, 3) || [],
      editors: responseData?.data?.editors || [],
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
