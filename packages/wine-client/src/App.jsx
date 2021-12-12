import React from "react";

import Client from "./Client";
import "./App.css";
import { LoginProvider, ScreenProvider } from "./contextProviders";

const App = () => (
  <LoginProvider>
    <ScreenProvider>
      <Client />
    </ScreenProvider>
  </LoginProvider>
);
export default App;
