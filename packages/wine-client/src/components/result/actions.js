import axios from 'axios';

import { dispatch } from '../../store';

import {
  FETCH_WINES_FULFILLED,
  FETCH_WINES_REJECTED,
  FETCH_WINES_NO_MATCH,
  FETCH_WINES,
  REMOVE_FROM_CELLAR_FULFILLED,
  REMOVE_FROM_CELLAR_REJECTED,
  REMOVE_FROM_CELLAR,
  TOGGLE_DETAILED_RESULT_VIEW,
  FETCH_REVIEWS_FULFILLED,
  FETCH_REVIEWS_REJECTED,
  FETCH_REVIEWS_NO_MATCH,
  FETCH_REVIEWS,
} from './constants';

const fetchClickedReview = query => {
  axios
    .get(`/api/${query}`)
    .then(response => {
      if (response.data.data && response.data.data.length > 0) {
        dispatch({ type: FETCH_REVIEWS_FULFILLED, payload: response.data });
      } else {
        dispatch({ type: FETCH_REVIEWS_NO_MATCH, payload: response.data });
      }
    })
    .catch(err => {
      dispatch({ type: FETCH_REVIEWS_REJECTED, payload: err });
    });
};

const removeFromCellar = query => {
  axios
    .get(`/api/${query}`)
    .then(response => {
      dispatch({ type: REMOVE_FROM_CELLAR_FULFILLED, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: REMOVE_FROM_CELLAR_REJECTED, payload: err });
    });
};

const fetchClickedWine = query => {
  axios
    .get(`/api/${query}`)
    .then(response => {
      if (response.data.data && response.data.data.length > 0) {
        dispatch({ type: FETCH_WINES_FULFILLED, payload: response.data });
      } else {
        dispatch({ type: FETCH_WINES_NO_MATCH, data: response.data });
      }
    })
    .catch(err => {
      dispatch({ type: FETCH_WINES_REJECTED, payload: err });
    });
};

export const loadClickedReview = item => {
  dispatch({ type: FETCH_REVIEWS });
  if (!item.table) {
    fetchClickedReview('getAllReviews');
  } else if (item.table === 'wine') {
    fetchClickedReview(
      `getWineByProperty?property=${item.property}&value=${item.value}&table=${
        item.table
      }`,
    );
  } else {
    fetchClickedReview(
      `getWineByForeignProperty?property=${item.property}&value=${
        item.value
      }&table=${item.table}`,
    );
  }
};

export const loadOrderedClickedReview = item => {
  dispatch({ type: FETCH_REVIEWS });
  if (!item.table) {
    fetchClickedReview(`getAllReviews?orderedProp=${item.orderedProp}`);
  } else if (item.table === 'wine') {
    fetchClickedReview(
      `getWineByProperty?property=${item.property}&value=${item.value}&table=${
        item.table
      }&orderedProp=${item.orderedProp}`,
    );
  } else {
    fetchClickedReview(
      `getWineByForeignProperty?property=${item.property}&value=${
        item.value
      }&table=${item.table}&orderedProp=${item.orderedProp}`,
    );
  }
};

export const loadOrderedCellarClickedWine = item => {
  dispatch({ type: FETCH_REVIEWS });
  if (!item.table) {
    fetchClickedWine(`getAllCellar?orderedProp=${item.orderedProp}`);
  } else if (item.table === 'wine') {
    fetchClickedWine(
      `getWineByProperty?property=${item.property}&value=${item.value}&table=${
        item.table
      }&orderedProp=${item.orderedProp}`,
    );
  } else {
    fetchClickedWine(
      `getWineByForeignProperty?property=${item.property}&value=${
        item.value
      }&table=${item.table}&orderedProp=${item.orderedProp}`,
    );
  }
};
export const loadCellar = () => {
  dispatch({ type: FETCH_WINES });
  fetchClickedWine('getAllCellar');
};

export const loadCellarOrdered = item => {
  dispatch({ type: FETCH_WINES });
  fetchClickedWine(`getAllCellar?orderedProp=${item.orderedProp}`);
};

export const removeWineFromCellar = id => {
  dispatch({ type: REMOVE_FROM_CELLAR });
  removeFromCellar(`removeFromCellar?id=${id}`);
};

export const toggleDetailedView = () => {
  dispatch({ type: TOGGLE_DETAILED_RESULT_VIEW });
};
