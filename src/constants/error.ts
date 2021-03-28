export const ERR_REQUIRE_TOKEN = 1000;
export const RATE_LIMIT_EXCEEDED = 2000;

export const TWITTER_OVER_CAPACITY = 8000;
export const UNKNOWN = 9999;

export type ERRORS =
  | typeof TWITTER_OVER_CAPACITY
  | typeof ERR_REQUIRE_TOKEN
  | typeof RATE_LIMIT_EXCEEDED
  | typeof UNKNOWN;
