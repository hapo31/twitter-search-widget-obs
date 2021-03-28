import { TwitterError } from "../../@types/twitter";
import { ERR_REQUIRE_TOKEN, RATE_LIMIT_EXCEEDED, TWITTER_OVER_CAPACITY, UNKNOWN } from "../constants/error";

/**
 * @see https://developer.twitter.com/ja/docs/ads/general/guides/response-codes
 */

export function convertError(error: TwitterError) {
  switch (error.code) {
    case "OVER_CAPACITY":
      return TWITTER_OVER_CAPACITY;
    case "TWEET_RATE_LIMIT_EXCEEDED":
      return RATE_LIMIT_EXCEEDED;
    case "UNAUTHORIZED_CLIENT_APPLICATION":
      return ERR_REQUIRE_TOKEN;
    default:
      return UNKNOWN;
  }
}
