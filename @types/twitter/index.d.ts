export type Response<T> = TwitterErrorResponse | T;

export type OAuth2ResultResponse = {
  token_type: "bearer";
  access_token: string;
};

export type TwitterErrorResponse = {
  errors: TwitterError[];
  request: {
    params: {
      [k in key]: string;
    };
  };

  statusCode: number;
};

export type TwitterError = {
  parameter: string;
  details: string;
  code: string;
  value: string;
  message: string;
};

// JSON から機械的に変換したやつだからクッソ汚い

interface Hashtag {
  text: string;
  indices: number[];
}

interface Url {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

interface Entities {
  hashtags: Hashtag[];
  symbols: any[];
  user_mentions: any[];
  urls: Url[];
}

interface Metadata {
  result_type: string;
  iso_language_code: string;
}

interface Url3 {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

interface Url2 {
  urls: Url3[];
}

interface Description {
  urls: any[];
}

interface Entities2 {
  url: Url2;
  description: Description;
}

interface User {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url: string;
  entities: Entities2;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset: number;
  time_zone: string;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang: string;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following?: any;
  follow_request_sent?: any;
  notifications?: any;
  translator_type: string;
}

interface Status {
  created_at: string;
  id: any;
  id_str: string;
  text: string;
  full_text?: string;
  truncated: boolean;
  entities: Entities;
  metadata: Metadata;
  source: string;
  in_reply_to_status_id?: any;
  in_reply_to_status_id_str?: any;
  in_reply_to_user_id?: any;
  in_reply_to_user_id_str?: any;
  in_reply_to_screen_name?: any;
  user: User;
  geo?: any;
  coordinates?: any;
  place?: any;
  contributors?: any;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  lang: string;

  retweeted_status?: {
    text: string;
  };
}

interface SearchMetadata {
  completed_in: number;
  max_id: number;
  max_id_str: string;
  next_results: string;
  query: string;
  count: number;
  since_id: number;
  since_id_str: string;
}

export interface SearchResultResponse {
  statuses: Status[];
  search_metadata: SearchMetadata;
}
