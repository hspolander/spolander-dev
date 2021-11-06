import axios from "axios";
import { dispatch } from "../../../configureStore";

import {
  FETCH_AUTOCOMPLETE_FULFILLED,
  FETCH_AUTOCOMPLETE_NO_MATCH,
  FETCH_AUTOCOMPLETE_REJECTED,
  FETCH_AUTOCOMPLETE_TYPING,
  FETCH_AUTOCOMPLETE,
} from "./constants";

const fetchAutocompleteSearch = (input) => {
  axios
    .get(`/api/autocompleteSearch?startsWith=${input}`)
    .then(({ data }) => {
      if (data.error) {
        dispatch({ type: FETCH_AUTOCOMPLETE_REJECTED, payload: data });
      } else if (Object.keys(data.data).length === 0) {
        dispatch({ type: FETCH_AUTOCOMPLETE_NO_MATCH, payload: data });
      } else {
        dispatch({
          type: FETCH_AUTOCOMPLETE_FULFILLED,
          payload: data,
        });
      }
    })
    .catch((err) => {
      dispatch({ type: FETCH_AUTOCOMPLETE_REJECTED, payload: err });
    });
};

const loadAutocompleteSearch = (input) => {
  if (input.length > 1) {
    dispatch({ type: FETCH_AUTOCOMPLETE });
    fetchAutocompleteSearch(input);
  } else {
    dispatch({ type: FETCH_AUTOCOMPLETE_TYPING });
  }
};

export default loadAutocompleteSearch;
