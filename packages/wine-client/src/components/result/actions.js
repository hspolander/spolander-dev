import axios from "axios";

import { dispatch } from "../../configureStore";

import {
  FETCH_REVIEWS_FULFILLED,
  FETCH_REVIEWS_REJECTED,
  FETCH_REVIEWS_NO_MATCH,
  FETCH_REVIEWS,
} from "./constants";

const fetchClickedReview = (query) => {
  axios
    .get(`/api/${query}`)
    .then((response) => {
      if (response.data.data && response.data.data.length > 0) {
        dispatch({ type: FETCH_REVIEWS_FULFILLED, payload: response.data });
      } else {
        dispatch({ type: FETCH_REVIEWS_NO_MATCH, payload: response.data });
      }
    })
    .catch((err) => {
      dispatch({ type: FETCH_REVIEWS_REJECTED, payload: err });
    });
};

export const loadClickedReview = (item) => {
  dispatch({ type: FETCH_REVIEWS });
  if (!item.table) {
    fetchClickedReview("getAllReviews");
  } else if (item.table === "wine") {
    fetchClickedReview(
      `getWineByProperty?property=${item.property}&value=${item.value}&table=${item.table}`
    );
  } else {
    fetchClickedReview(
      `getWineByForeignProperty?property=${item.property}&value=${item.value}&table=${item.table}`
    );
  }
};

export const loadOrderedClickedReview = (item) => {
  dispatch({ type: FETCH_REVIEWS });
  if (!item.table) {
    fetchClickedReview(`getAllReviews?orderedProp=${item.orderedProp}`);
  } else if (item.table === "wine") {
    fetchClickedReview(
      `getWineByProperty?property=${item.property}&value=${item.value}&table=${item.table}&orderedProp=${item.orderedProp}`
    );
  } else {
    fetchClickedReview(
      `getWineByForeignProperty?property=${item.property}&value=${item.value}&table=${item.table}&orderedProp=${item.orderedProp}`
    );
  }
};
