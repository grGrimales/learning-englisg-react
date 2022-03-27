import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import { authReducer } from "../reducers/authReducer";

import thunk from "redux-thunk";
import { vocabularyReducer } from "../reducers/vocabularyReducer";

const reducers = combineReducers({
  auth: authReducer,
  vocabulary: vocabularyReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
