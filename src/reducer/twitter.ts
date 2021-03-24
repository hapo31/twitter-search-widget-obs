import { STORE_TOKEN, STORE_TWEETS, TwitterActions, UPDATE_LAST_SEARCH_DATE } from "../actions/twitter";
import { TwitterState } from "../store/twitter";

const initialState: TwitterState = {
  tweets: [],
  token: null,
};

export function twitterReducer(state = initialState, action: TwitterActions): TwitterState {
  switch (action.type) {
    case STORE_TOKEN: {
      return {
        ...state,
        tweets: [],
        token: action.payload.token,
      };
    }

    case STORE_TWEETS: {
      action.payload.tweets.sort((a, b) => {
        return parseInt((BigInt(a.id) - BigInt(b.id)).toString());
      });
      return {
        ...state,
        tweets: action.payload.tweets,
        sinceId: action.payload.sinceId ?? state.sinceId,
        lastSearchDate: action.payload.lastSearchDate ?? state.lastSearchDate,
      };
    }
    case UPDATE_LAST_SEARCH_DATE: {
      return {
        ...state,
        lastSearchDate: action.payload.date,
      };
    }
  }

  return state;
}
