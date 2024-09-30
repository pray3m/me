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

export const getAccessToken = async (): Promise<string> => {
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

  const text = await response.text();
  return text;
};

export const getReadStats = async (): Promise<WakatimeResponse> => {
  const res = await getAccessToken();
  const access_token = res.substring(
    res.indexOf("=") + 1,
    res.lastIndexOf("&refresh_token")
  );

  const request = await fetch(`${STATS_ENDPOINT}/last_7_days`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const status = request.status;

  if (status > 400) return { status, data: {} };

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
};

export const getALLTimeSinceToday = async (): Promise<WakatimeResponse> => {
  const res = await getAccessToken();
  const access_token = res.substring(
    res.indexOf("=") + 1,
    res.lastIndexOf("&refresh_token")
  );

  const request = await fetch(ALL_TIME_SINCE_TODAY, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const status = request.status;

  if (status > 400) return { status, data: {} };

  const getData = await request.json();

  const data: AllTimeStats = {
    text: getData?.data?.text,
    total_seconds: getData?.data?.total_seconds,
  };

  return {
    status,
    data,
  };
};
