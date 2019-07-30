import { SET_SCREEN_SIZE } from './constants';
import { dispatch } from '../../configureStore';

export const setScreenSize = isSmall => {
  dispatch({ type: SET_SCREEN_SIZE, payload: isSmall });
};
