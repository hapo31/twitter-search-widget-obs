export type Tweet = {
  name: string;
  screen_name: string;
  id: string;
  createdAt: Date;
  profileImg: string;
};

export type TwitterState = {
  token?: string;
  tweets: Tweet[];
};
