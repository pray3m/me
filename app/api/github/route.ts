import { NextResponse } from "next/server";

const user_id: string = "pray3m";
const read_user_token: string | undefined = process.env.GITHUB_READ_USER_TOKEN;

const GITHUB_USER_ENDPOINT: string = "https://api.github.com/graphql";

const GITHUB_USER_QUERY: string = `query {
  user(login: "${user_id}") {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
  }
}`;

export async function GET() {
  try {
    const response = await fetch(GITHUB_USER_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `bearer ${read_user_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: GITHUB_USER_QUERY }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong with the request" },
      { status: 500 }
    );
  }
}
