const errorHandlerMiddleware = () => next => action => {
  try {
  	//TODO
    next(action);
  } catch (e) {
    console.log('error occured.', e);
  }
};

export default errorHandlerMiddleware;
