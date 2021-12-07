import axios from "axios";
import { dispatch } from "../../configureStore";

import {
  ADD_REVIEW_FETCHING,
  ADD_REVIEW_FULFILLED,
  ADD_REVIEW_REJECTED,
  CLEAR_SNACKBAR,
  SET_SNACKBAR,
  RESET_ADD_REVIEW_VALUES,
  FETCH_SYSTEMBOLAGET_WINE_DATA_FULFILLED,
  FETCH_SYSTEMBOLAGET_WINE_DATA_REJECTED,
  FETCH_SYSTEMBOLAGET_WINE_DATA_FETCHING,
  FIELD_AUTOCOMPLETE_FETCHING,
  FIELD_AUTOCOMPLETE_FULFILLED,
  FIELD_AUTOCOMPLETE_REJECTED,
  FIELD_AUTOCOMPLETE_NO_MATCH,
} from "./constants";

export const setSnackbar = (messageType, message) => {
  dispatch({ type: SET_SNACKBAR, payload: { messageType, message } });
};

const addReview = (values) => {
  axios
    .post("/api/insertWineReview", values)
    .then((response) => {
      dispatch({ type: ADD_REVIEW_FULFILLED, payload: response.data });
      setSnackbar("success", `Vi har lagt till ditt vin ${values?.name}`);
      dispatch({ type: RESET_ADD_REVIEW_VALUES });
    })
    .catch((err) => {
      dispatch({ type: ADD_REVIEW_REJECTED, payload: err });
      setSnackbar("error", "Något gick fel. Vänligen sök hjälp hos din make.");
    });
};

const fieldAutocomplete = (value) => {
  axios
    .get(`/api/autocompleteAddWine${value}`)
    .then((response) => {
      if (response.data && response.data.data) {
        dispatch({
          type: FIELD_AUTOCOMPLETE_FULFILLED,
          payload: response.data.data,
        });
      } else {
        dispatch({ type: FIELD_AUTOCOMPLETE_NO_MATCH });
      }
    })
    .catch((err) => {
      dispatch({ type: FIELD_AUTOCOMPLETE_REJECTED, payload: err });
    });
};

export const clearSnackbar = () => {
  dispatch({ type: CLEAR_SNACKBAR });
};

export const loadAddReview = (values) => {
  dispatch({ type: ADD_REVIEW_FETCHING });
  addReview(values);
};

export const loadSystembolagetWineData = (url) => {
  dispatch({
    type: FETCH_SYSTEMBOLAGET_WINE_DATA_FETCHING,
  });
  const urlEncoded = encodeURIComponent(`https://www.systembolaget.se${url}`);
  axios
    .get(`/api/getAdditionalWineData?url=${urlEncoded}`)
    .then((response) => {
      if (response.data?.data) {
        dispatch({
          type: FETCH_SYSTEMBOLAGET_WINE_DATA_FULFILLED,
          payload: response.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch({ type: FETCH_SYSTEMBOLAGET_WINE_DATA_REJECTED, payload: err });
    });
};

export const loadFieldAutocomplete = (prop, value) => {
  if (value.length > 1) {
    dispatch({ type: FIELD_AUTOCOMPLETE_FETCHING });
    if (prop === "grape") {
      fieldAutocomplete(`?&startsWith=${value}`);
    } else {
      fieldAutocomplete(`?&startsWith=${value}&prop=${prop}`);
    }
  } else {
    dispatch({ type: FIELD_AUTOCOMPLETE_NO_MATCH });
  }
};
