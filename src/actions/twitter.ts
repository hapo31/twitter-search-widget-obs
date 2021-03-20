import { ThunkAction } from "redux-thunk";
import { oauth, searchTweets as reqSearchTweets } from "../service/twitter";
import { RootState } from "../store/root";
import { Tweet } from "../store/twitter";

type TwitterThunkAction = ThunkAction<void, RootState, void, TwitterActions>;

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

const searchTweets = (tweets: Tweet[], sinceId: string) => ({
  type: FETCH_TWEETS,
  payload: { tweets, sinceId },
});

export const searchTweetsThunk = (searchWord: string, excludeRT?: boolean, until?: Date): TwitterThunkAction => {
  return async (dispatch, getState) => {
    const { twitter: state } = getState();
    const token = state.token;
    if (!token) {
      console.error("before authentication");
      return;
    }

    const res = await reqSearchTweets(token, searchWord, state.sinceId, until, excludeRT);
    const tweets = res.statuses
      .filter((status) => (excludeRT && status.retweeted_status == null) || !excludeRT)
      .map(
        (status) =>
          ({
            text: status.full_text,
            createdAt: new Date(status.created_at),
            id: status.id_str,
            screenName: status.user.screen_name,
            name: status.user.name,
            profileImg: status.user.profile_image_url_https,
          } as Tweet)
      );

    const sinceId = res.search_metadata.since_id_str;

    dispatch(searchTweets(tweets, sinceId));
  };
};

export type TwitterActions = ReturnType<typeof storeToken | typeof searchTweets>;
