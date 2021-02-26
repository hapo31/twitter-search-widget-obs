import { TwitterAPI } from "./api";

export function Search(q: string) {
  return TwitterAPI(
    "1.1/search/tweets.json",
    "GET",
    "1BLFEbQT6ZKkwxK3u8E9w",
    "PAgN6V5MdJoa3KkC5m1CNr9HNEYruQHYGn8L7griw",
    "115029611-zWx5FEpFLcnIG0rImCupwhN3y7KIhn7FAW4tmeLk",
    "sPHsc9G7Pxuhfa4ZoGGDe43QNzt5apmU6H0eLUsRx1fbK",
    {
      q,
    }
  );
}
