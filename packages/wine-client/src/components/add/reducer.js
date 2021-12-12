import {
  FETCH_SYSTEMBOLAGET_WINE_DATA_FULFILLED,
  FETCH_SYSTEMBOLAGET_WINE_DATA_REJECTED,
  FETCH_SYSTEMBOLAGET_WINE_DATA_FETCHING,
  FIELD_AUTOCOMPLETE_FETCHING,
  FIELD_AUTOCOMPLETE_FULFILLED,
  FIELD_AUTOCOMPLETE_REJECTED,
  FIELD_AUTOCOMPLETE_NO_MATCH,
} from "./constants";

const initialState = {
  data: null,
  fetching: false,
  fetchIsBlocking: false,
  fetched: false,
  fieldData: null,
  focusedField: null,
  countries: [],
  subTypes: [],
  types: [],
  addedWine: null,
  snackbar: null,
  systemWineData: null,
  singleSysWineData: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SYSTEMBOLAGET_WINE_DATA_FETCHING: {
      return {
        ...state,
        fetching: true,
        fetchIsBlocking: true,
        singleSysWineData: null,
      };
    }
    case FETCH_SYSTEMBOLAGET_WINE_DATA_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetchIsBlocking: false,
        singleSysWineData: action.payload,
      };
    }
    case FETCH_SYSTEMBOLAGET_WINE_DATA_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetchIsBlocking: false,
        error: action.payload,
      };
    }
    case FIELD_AUTOCOMPLETE_FETCHING: {
      return {
        ...state,
        fetched: false,
        fetching: true,
        fetchIsBlocking: false,
      };
    }
    case FIELD_AUTOCOMPLETE_FULFILLED: {
      return {
        ...state,
        fetched: true,
        fetching: false,
        fieldData: action.payload,
      };
    }
    case FIELD_AUTOCOMPLETE_NO_MATCH: {
      return {
        ...state,
        fetched: true,
        fetching: false,
        fetchIsBlocking: false,
        fieldData: null,
      };
    }
    case FIELD_AUTOCOMPLETE_REJECTED: {
      return {
        ...state,
        fetched: true,
        fetching: false,
        fetchIsBlocking: false,
        fieldData: null,
      };
    }
    default: {
      return { ...state };
    }
  }
}
