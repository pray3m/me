export const GetGithubUser = async () => {
  const response = await fetch("https://api.github.com/users/pray3m");

  const status: number = response.status;
  if (status >= 400) {
    return { status, data: {} };
  }

  const data = await response.json();
  return { status, data };
};
