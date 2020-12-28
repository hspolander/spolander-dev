import axios from "axios";
import { jsonToQueryString, removeFalsy } from "../global/helpfunctions";
import { dispatch } from "../../configureStore";

import {
  ADD_REVIEW_FETCHING,
  ADD_REVIEW_FULFILLED,
  ADD_REVIEW_REJECTED,
  CLEAR_SNACKBAR,
  SET_SNACKBAR,
  SYSTEMBOLAGET_FETCHING,
  RESET_ADD_REVIEW_VALUES,
  UPDATE_ADD_REVIEW_VALUES,
  FETCH_SYSTEMBOLAGET_WINE_DATA_FULFILLED,
  FETCH_SYSTEMBOLAGET_WINE_DATA_REJECTED,
  FETCH_SYSTEMBOLAGET_WINE_DATA_FETCHING,
  FETCH_SYSTEMBOLAGET_COUNTRIES_FULFILLED,
  FETCH_SYSTEMBOLAGET_COUNTRIES_REJECTED,
  FETCH_SYSTEMBOLAGET_COUNTRIES_FETCHING,
  FETCH_SYSTEMBOLAGET_SUBTYPES_FULFILLED,
  FETCH_SYSTEMBOLAGET_SUBTYPES_REJECTED,
  FETCH_SYSTEMBOLAGET_SUBTYPES_FETCHING,
  FETCH_SYSTEMBOLAGET_TYPES_FULFILLED,
  FETCH_SYSTEMBOLAGET_TYPES_REJECTED,
  FETCH_SYSTEMBOLAGET_TYPES_FETCHING,
  FETCH_SYSTEMBOLAGET_FULFILLED,
  FETCH_SYSTEMBOLAGET_REJECTED,
  FETCH_SYSTEMBOLAGET_NO_MATCH,
  SYSTEMBOLAGET_CLEAR_VALUES,
  FIELD_AUTOCOMPLETE_FETCHING,
  FIELD_AUTOCOMPLETE_FULFILLED,
  FIELD_AUTOCOMPLETE_REJECTED,
  FIELD_AUTOCOMPLETE_NO_MATCH,
} from "./constants";

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

export const setSnackbar = (messageType, message) => {
  dispatch({ type: SET_SNACKBAR, payload: { messageType, message } });
};

export const getSysWines = (values) => {
  axios
    .get(`/api/getSysWines${values}`)
    .then((response) => {
      if (response.data && response.data.data.length > 0) {
        dispatch({
          type: FETCH_SYSTEMBOLAGET_FULFILLED,
          payload: response.data.data,
        });
      } else {
        dispatch({ type: FETCH_SYSTEMBOLAGET_NO_MATCH });
      }
    })
    .catch((err) => {
      dispatch({ type: FETCH_SYSTEMBOLAGET_REJECTED, payload: err });
    });
};

export const loadAddReview = (values) => {
  dispatch({ type: ADD_REVIEW_FETCHING });
  addReview(values);
};

export const loadSysWines = (values) => {
  values = removeFalsy(values);
  dispatch({ type: SYSTEMBOLAGET_FETCHING });
  getSysWines(jsonToQueryString(values));
};

export const clearSysWines = () => {
  dispatch({ type: SYSTEMBOLAGET_CLEAR_VALUES });
};

export const getSystembolagetTypes = () => {
  dispatch({
    type: FETCH_SYSTEMBOLAGET_TYPES_FETCHING,
  });
  axios
    .get(`/api/getTypes`)
    .then((response) => {
      if (response.data?.data?.length > 0) {
        dispatch({
          type: FETCH_SYSTEMBOLAGET_TYPES_FULFILLED,
          payload: response.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch({ type: FETCH_SYSTEMBOLAGET_TYPES_REJECTED, payload: err });
    });
};

export const getSystembolagetCountries = () => {
  dispatch({
    type: FETCH_SYSTEMBOLAGET_COUNTRIES_FETCHING,
  });
  axios
    .get(`/api/getCountries`)
    .then((response) => {
      if (response.data?.data?.length > 0) {
        dispatch({
          type: FETCH_SYSTEMBOLAGET_COUNTRIES_FULFILLED,
          payload: response.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch({ type: FETCH_SYSTEMBOLAGET_COUNTRIES_REJECTED, payload: err });
    });
};

export const getSystembolagetSubTypes = () => {
  dispatch({
    type: FETCH_SYSTEMBOLAGET_SUBTYPES_FETCHING,
  });
  axios
    .get(`/api/getSubTypes`)
    .then((response) => {
      if (response.data?.data?.length > 0) {
        dispatch({
          type: FETCH_SYSTEMBOLAGET_SUBTYPES_FULFILLED,
          payload: response.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch({ type: FETCH_SYSTEMBOLAGET_SUBTYPES_REJECTED, payload: err });
    });
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
