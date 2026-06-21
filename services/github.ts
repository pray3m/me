import { env } from "@/lib/env"

const GITHUB_USER_ENDPOINT: string = "https://api.github.com/graphql"

const readUserToken: string = env.GITHUB_READ_USER_TOKEN

const GITHUB_USER_QUERY: string = `
  query GetUserContributions($login: String!){
    user(login: $login) {
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
  }
`

export const getGithubUser = async (userID: string) => {
  const response = await fetch(GITHUB_USER_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `bearer ${readUserToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GITHUB_USER_QUERY,
      variables: { login: userID },
    }),
  })

  const status: number = response.status
  const responseJson = await response.json()

  if (!response.ok) {
    return {
      status,
      data: {
        error: responseJson.message || "Failed to fetch data from GitHub.",
      },
    }
  }

  return { status, data: responseJson.data.user }
}
