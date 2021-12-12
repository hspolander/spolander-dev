import { combineReducers } from "redux";

import searchbarReducer from "./components/banner/search/reducer";
import loginReducer from "./components/login/reducer";
import globalReducer from "./components/global/reducer";

export default combineReducers({
  searchbarReducer,
  loginReducer,
  globalReducer,
});
