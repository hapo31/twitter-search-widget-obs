import { ThunkAction } from "redux-thunk";
import { ERRORS } from "../constants/error";
import { oauth, searchTweets as reqSearchTweets } from "../service/twitter";
import { RootState } from "../store/root";
import { Tweet } from "../store/twitter";
import { convertError } from "../util/error";

type TwitterThunkAction = ThunkAction<void, RootState, void, TwitterActions>;

export const STORE_TOKEN = "TWITTER/STORE_TOKEN" as const;
export const STORE_TWEETS = "TWITTER/STORE_TWEETS" as const;

export const ERROR_ACCRUED = "TWITTER/ERROR_ACCRUED" as const;

export const UPDATE_LAST_SEARCH_DATE = "TWITTER/UPDATE_LAST_SEARCH_DATE" as const;

export const storeToken = (token: string) => ({
  type: STORE_TOKEN,
  payload: { token },
});

export const appAuthThunk = (): TwitterThunkAction => {
  return async (dispatch) => {
    const res = await oauth();
    if ("errors" in res) {
      const err = convertError(res.errors[0]);
      dispatch(errorAccrued(err, res.errors[0].message));
    } else {
      dispatch(storeToken(res.token));
    }
  };
};

export const updateLastSearchDate = (date: Date) => ({
  type: UPDATE_LAST_SEARCH_DATE,
  payload: {
    date,
  },
});

export const errorAccrued = (errorCode: ERRORS, message: string) => ({
  type: ERROR_ACCRUED,
  payload: {
    errorCode,
    message,
  },
});

export const storeTweets = (tweets: Tweet[], sinceId?: string, lastSearchDate?: Date) => ({
  type: STORE_TWEETS,
  payload: { tweets, sinceId, lastSearchDate },
});

export const searchTweetsThunk = (
  searchWord: string,
  count: number,
  excludeRT?: boolean,
  until?: Date
): TwitterThunkAction => {
  return async (dispatch, getState) => {
    const { twitter: state } = getState();
    console.log(`lastSearchDate:${state.lastSearchDate?.toLocaleTimeString()} `);
    // 前回の取得から1分経っていなければ取得処理は行わない
    if (state.lastSearchDate != null && Date.now() - state.lastSearchDate.getTime() < 60 * 1000) {
      console.log(`search was skipped.`);
      return;
    }
    const token = state.token;
    if (!token) {
      console.error("before authentication");
      return;
    }

    const res = await reqSearchTweets(token, searchWord, count, state.sinceId, until, excludeRT);
    if ("errors" in res) {
      for (const error of res.errors) {
        const err = convertError(error);
        dispatch(errorAccrued(err, error.message));
      }
      console.error(`error accrued:${JSON.stringify(res.errors, null, " ")}`);
      return;
    }
    if (res.statuses.length === 0) {
      dispatch(updateLastSearchDate(new Date()));
      console.log("tweets not found");
      return;
    }
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

    const idBigInt = BigInt(tweets[0].id);
    const sinceId = (idBigInt + BigInt(1)).toString();
    console.log(`fetch tweet length:${tweets.length}`);
    console.log(`sinceId:${sinceId}`);
    dispatch(storeTweets(tweets, sinceId, new Date()));
  };
};

export type TwitterActions = ReturnType<
  typeof storeToken | typeof storeTweets | typeof updateLastSearchDate | typeof errorAccrued
>;
