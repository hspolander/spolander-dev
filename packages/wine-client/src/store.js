import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import errorHandlerMiddleware from './errorHandlerMiddleware';
import authMiddleware from './authMiddleware';

import combineReducers from './reducers';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  combineReducers,
  composeEnhancers(
    applyMiddleware(thunk, promise, errorHandlerMiddleware, authMiddleware),
  ),
);

export const getState = () => store.getState();

export const dispatch = action => store.dispatch(action);

export default store;
