import { STORE_TOKEN, FETCH_TWEETS, TwitterActions } from "../actions/twitter";
import { TwitterState } from "../store/twitter";

const initialState: TwitterState = {
  tweets: [],
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

    case FETCH_TWEETS: {
      return {
        ...state,
        tweets: state.tweets.concat(...action.payload.tweets),
      };
    }
  }

  return state;
}
