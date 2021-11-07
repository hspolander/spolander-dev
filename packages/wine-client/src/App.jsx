import React from "react";
import { Provider } from "react-redux";

import Client from "./Client";
import store from "./configureStore";
import "./App.css";

const App = () => (
    <Provider store={store}>
      <Client />
    </Provider>
  );
export default App;
