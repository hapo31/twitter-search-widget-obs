export type Tweet = {
  text: string;
  name: string;
  screenName: string;
  id: number;
  createdAt: Date;
  profileImg: string;
};

export type TwitterState = {
  token?: string;
  sinceId?: string;
  tweets: Tweet[];
};
