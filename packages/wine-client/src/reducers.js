import { combineReducers } from "redux";

import searchbarReducer from "./components/banner/search/reducer";
import resultReducer from "./components/result/reducer";
import addReducer from "./components/add/reducer";
import loginReducer from "./components/login/reducer";
import globalReducer from "./components/global/reducer";

export default combineReducers({
  searchbarReducer,
  addReducer,
  resultReducer,
  loginReducer,
  globalReducer,
});
