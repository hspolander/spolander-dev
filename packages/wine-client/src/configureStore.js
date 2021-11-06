import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authMiddleware from "./authMiddleware";
import invariant from "redux-immutable-state-invariant";

import reducers from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = createStore(
  reducers,
  composeEnhancer(applyMiddleware(invariant(), thunk, authMiddleware))
);
export const getState = () => configureStore.getState();

export const dispatch = (action) => configureStore.dispatch(action);

export default configureStore;
