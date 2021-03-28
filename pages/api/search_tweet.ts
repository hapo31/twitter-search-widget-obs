import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-fetch";
import { TwitterDomain } from "../../src/lib/twitter/api";
import { QueryString, padding } from "../../src/util/util";

export type SearchTweetRequestParam = {
  token: string;
  searchWord: string;
  until?: number;
  sinceId?: string;
  excludeRT?: boolean;
  count?: number;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const param = (req.query as unknown) as SearchTweetRequestParam;

  const token = param.token;
  if (!token) {
    res.status(401).json({ error: "'token' required." });
    return;
  }

  const searchWord = param.searchWord + " exclude:nativeretweets" + " exclude:replies";
  if (!searchWord) {
    res.status(400).json({ error: "'searchWord' required." });
    return;
  }

  const until = param.until ? new Date(param.until) : null;
  const untilDateStr = until
    ? `${until.getFullYear()}-${padding(`${until.getMonth() + 1}`, "0", 2)}-${padding(`${until.getDate()}`, "0", 2)}`
    : null;

  const count = param.count ?? 15;

  const queryString = QueryString({
    q: param.searchWord,
    until: untilDateStr,
    modules: "status",
    tweet_mode: "extended",
    since_id: param.sinceId,
    count,
  });

  const response = await fetch(`${TwitterDomain}/1.1/search/tweets.json?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if ("errors" in json) {
    const statusCode = response.status;
    res.status(statusCode).json({ ...json, statusCode });
  } else {
    res.status(200).json(json);
  }
};
