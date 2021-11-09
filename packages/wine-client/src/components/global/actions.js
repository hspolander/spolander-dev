import SET_SCREEN_SIZE from "./constants";
import { dispatch } from "../../configureStore";

const setScreenSize = (isSmall) => {
  dispatch({ type: SET_SCREEN_SIZE, payload: isSmall });
};

export default setScreenSize;
