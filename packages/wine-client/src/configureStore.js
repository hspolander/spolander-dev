import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import authMiddleware from './authMiddleware';

import reducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = createStore(
    reducers,
    composeEnhancer(
      applyMiddleware(
        thunk,
        promise,
        authMiddleware,
      )
    ),
  );

  export default configureStore;