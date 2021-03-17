import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { twitterReducer } from "../reducer/twitter";

const rootReducer = combineReducers({ twitter: twitterReducer });

export const rootStore = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootStore.getState>;
