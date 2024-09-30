import { getGithubUser } from "@/services/github";

export async function GET() {
  const { status, data } = await getGithubUser();

  if (status > 400) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch data from GitHub." }),
      {
        status: 500, // Internal server error
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(JSON.stringify(data), {
    status: 200, // Success
    headers: { "Content-Type": "application/json" },
  });
}
