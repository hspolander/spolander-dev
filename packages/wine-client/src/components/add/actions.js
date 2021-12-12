import axios from "axios";
import { dispatch } from "../../configureStore";

import {
  FETCH_SYSTEMBOLAGET_WINE_DATA_FULFILLED,
  FETCH_SYSTEMBOLAGET_WINE_DATA_REJECTED,
  FETCH_SYSTEMBOLAGET_WINE_DATA_FETCHING,
  FIELD_AUTOCOMPLETE_FETCHING,
  FIELD_AUTOCOMPLETE_FULFILLED,
  FIELD_AUTOCOMPLETE_REJECTED,
  FIELD_AUTOCOMPLETE_NO_MATCH,
} from "./constants";


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
