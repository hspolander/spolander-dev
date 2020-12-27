import {
  ADD_REVIEW_FETCHING,
  ADD_REVIEW_FULFILLED,
  ADD_REVIEW_REJECTED,
  CLEAR_SNACKBAR,
  SET_SNACKBAR,
  SYSTEMBOLAGET_FETCHING,
  FETCH_SYSTEMBOLAGET_FULFILLED,
  FETCH_SYSTEMBOLAGET_REJECTED,
  FETCH_SYSTEMBOLAGET_NO_MATCH,
  FETCH_SYSTEMBOLAGET_WINE_DATA_FULFILLED,
  FETCH_SYSTEMBOLAGET_WINE_DATA_REJECTED,
  FETCH_SYSTEMBOLAGET_WINE_DATA_NO_MATCH,
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
  SYSTEMBOLAGET_CLEAR_VALUES,
  FIELD_AUTOCOMPLETE_FETCHING,
  FIELD_AUTOCOMPLETE_FULFILLED,
  FIELD_AUTOCOMPLETE_REJECTED,
  FIELD_AUTOCOMPLETE_NO_MATCH,
  FIELD_AUTOCOMPLETE_CLEAR_FOCUS,
  FIELD_AUTOCOMPLETE_FOCUS_FIELD,
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
    case CLEAR_SNACKBAR: {
      return { ...state, snackbar: null };
    }
    case SET_SNACKBAR: {
      return { ...state, snackbar: action.payload };
    }
    case FETCH_SYSTEMBOLAGET_COUNTRIES_FETCHING: {
      return { ...state, fetching: true, fetchIsBlocking: false };
    }
    case FETCH_SYSTEMBOLAGET_COUNTRIES_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetchIsBlocking: false,
        countries: action.payload,
      };
    }
    case FETCH_SYSTEMBOLAGET_COUNTRIES_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetchIsBlocking: false,
        countries: [],
      };
    }
    case FETCH_SYSTEMBOLAGET_SUBTYPES_FETCHING: {
      return { ...state, fetching: true, fetchIsBlocking: false };
    }
    case FETCH_SYSTEMBOLAGET_SUBTYPES_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetchIsBlocking: false,
        subTypes: action.payload,
      };
    }
    case FETCH_SYSTEMBOLAGET_SUBTYPES_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetchIsBlocking: false,
        subTypes: [],
      };
    }
    case FETCH_SYSTEMBOLAGET_TYPES_FETCHING: {
      return { ...state, fetching: true, fetchIsBlocking: false };
    }
    case FETCH_SYSTEMBOLAGET_TYPES_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetchIsBlocking: false,
        types: action.payload,
      };
    }
    case FETCH_SYSTEMBOLAGET_TYPES_REJECTED: {
      return { ...state, fetching: false, fetchIsBlocking: false, types: [] };
    }
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
    case ADD_REVIEW_FETCHING: {
      return {
        ...state,
        fetching: true,
        fetchIsBlocking: true,
      };
    }
    case ADD_REVIEW_FULFILLED: {
      return {
        ...state,
        fetching: false,
        addedWine: action.payload,
        fetchIsBlocking: false,
      };
    }
    case ADD_REVIEW_REJECTED: {
      return {
        ...state,
        error: action.payload,
        fetchIsBlocking: false,
        fetching: false,
      };
    }
    case FETCH_SYSTEMBOLAGET_WINE_DATA_NO_MATCH: {
      return {
        ...state,
        fetching: false,
        fetchIsBlocking: false,
        singleSysWineData: null,
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
    case SYSTEMBOLAGET_FETCHING: {
      return {
        ...state,
        fetched: false,
        fetching: true,
        fetchIsBlocking: true,
        systemWineData: null,
      };
    }
    case SYSTEMBOLAGET_CLEAR_VALUES: {
      return { ...state, systemWineData: null };
    }
    case FETCH_SYSTEMBOLAGET_FULFILLED: {
      return {
        ...state,
        fetched: true,
        fetching: false,
        fetchIsBlocking: false,
        systemWineData: action.payload,
      };
    }
    case FETCH_SYSTEMBOLAGET_REJECTED: {
      return {
        ...state,
        fetched: true,
        fetching: false,
        fetchIsBlocking: false,
        systemWineData: null,
      };
    }
    case FETCH_SYSTEMBOLAGET_NO_MATCH: {
      return {
        ...state,
        fetched: true,
        fetching: false,
        fetchIsBlocking: false,
        systemWineData: [],
      };
    }
    case FIELD_AUTOCOMPLETE_CLEAR_FOCUS: {
      return {
        ...state,
        fetched: false,
        fetching: false,
        fetchIsBlocking: false,
        fieldData: null,
        focusedField: null,
      };
    }
    case FIELD_AUTOCOMPLETE_FOCUS_FIELD: {
      return {
        ...state,
        fetched: false,
        fetching: false,
        fetchIsBlocking: false,
        fieldData: null,
        focusedField: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
}
