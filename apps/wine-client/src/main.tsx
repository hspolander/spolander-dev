import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import store from './configureStore';
import "./App.css";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
