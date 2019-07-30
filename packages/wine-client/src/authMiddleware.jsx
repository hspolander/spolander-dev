import Cookies from 'js-cookie';

const authMiddleware = store => next => action => {
  if (action) {
    try {
      if (action.payload && action.type.indexOf('@@redux') === -1) {
      if (action.payload && action.payload.session === 'nosession') {
        //TODO
        store.getState().loginReducer.isAuthenticated = false;
      } else if (
        action.payload &&
        action.payload.session === 'nosessionRedirect'
        ) {
          Cookies.remove('WINE_UUID');
        }
      }
      next(action);
    } catch (e) {
      console.log('error occured.', e);
    }
  }
};

export default authMiddleware;
