import fetch from "isomorphic-fetch";
import { Response, SearchResultResponse } from "../../@types/twitter";
import { QueryString } from "../util/util";

export async function oauth(): Promise<Response<{ token: string }>> {
  const res = await fetch("/api/oauth");
  return await res.json();
}

export async function searchTweets(
  token: string,
  searchWord: string,
  count: number,
  sinceId?: string,
  until?: Date,
  excludeRT?: boolean
): Promise<Response<SearchResultResponse>> {
  const q = QueryString({ token, searchWord, sinceId, until, excludeRT, count });
  const res = await fetch(`/api/search_tweet?${q}`);

  const json = await res.json();
  return json;
}
