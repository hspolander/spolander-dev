import { combineReducers } from "redux";

import loginReducer from "./components/login/reducer";
import globalReducer from "./components/global/reducer";

export default combineReducers({
  loginReducer,
  globalReducer,
});
