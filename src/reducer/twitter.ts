import { STORE_TOKEN, SEARCH_TWEETS, TwitterActions } from "../actions/twitter";
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

    case SEARCH_TWEETS: {
      action.payload.tweets.sort((a, b) => {
        return a.id - b.id;
      });
      return {
        ...state,
        tweets: state.tweets.concat(...action.payload.tweets),
      };
    }
  }

  return state;
}
