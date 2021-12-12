import React from "react";
import { Provider } from "react-redux";

import Client from "./Client";
import store from "./configureStore";
import "./App.css";
import { LoginProvider, ScreenProvider } from "./contextProviders";

const App = () => (
  <Provider store={store}>
    <LoginProvider>
        <ScreenProvider>
          <Client />
        </ScreenProvider>
      </LoginProvider>
  </Provider>
);
export default App;
