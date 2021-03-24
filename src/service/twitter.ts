import fetch from "isomorphic-fetch";
import { SearchResultResponse } from "../../@types/twitter";
import { QueryString } from "../util/util";

export async function oauth() {
  const res = await fetch("/api/oauth");
  return (await res.json()) as { token: string };
}

export async function searchTweets(
  token: string,
  searchWord: string,
  count: number,
  sinceId?: string,
  until?: Date,
  excludeRT?: boolean
) {
  const q = QueryString({ token, searchWord, sinceId, until, excludeRT, count });
  const res = await fetch(`/api/search_tweet?${q}`);

  const json = (await res.json()) as SearchResultResponse;
  return json;
}
