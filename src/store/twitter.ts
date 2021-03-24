export type Tweet = {
  text: string;
  name: string;
  screenName: string;
  id: string;
  createdAt: Date;
  profileImg: string;
};

export type TwitterState = {
  token: string | null;
  sinceId?: string;
  tweets: Tweet[];
  lastSearchDate?: Date;
};
