import fetch from "isomorphic-fetch";

export async function oauth() {
  const res = await fetch("/api/oauth");
  return (await res.json()) as { token: string };
}
