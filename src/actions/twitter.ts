import { ThunkAction } from "redux-thunk";
import { oauth } from "../service/twitter";
import { Tweet, TwitterState } from "../store/twitter";

type TwitterThunkAction = ThunkAction<void, TwitterState, void, TwitterActions>;

export const STORE_TOKEN = "TWITTER/STORE_TOKEN" as const;
export const FETCH_TWEETS = "TWITTER/FETCH_TWEETS" as const;

export const storeToken = (token: string) => ({
  type: STORE_TOKEN,
  payload: { token },
});

export const appAuthThunk = (): TwitterThunkAction => {
  return async (dispatch) => {
    const res = await oauth();

    dispatch(storeToken(res.token));
  };
};

const fetchTweets = (tweets: Tweet[]) => ({
  type: FETCH_TWEETS,
  payload: { tweets },
});

export const fetchTweetsThunk = (
  searchWord: string,
  lastId: string
): TwitterThunkAction => {
  return async (dispatch) => {};
};

export type TwitterActions = ReturnType<typeof storeToken | typeof fetchTweets>;
