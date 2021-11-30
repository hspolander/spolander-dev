import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams, useLocation } from "react-router-dom"

import SortWines from "./sortWines";
import { SearchResult, SearchResultDetailed, Loader, Noresult } from "./result";
import {
  loadClickedReview,
  loadOrderedClickedReview,
} from "./actions";
import { usePrevious } from "../../hooks";
import { authUser } from "../login/actions";

import "./result.scss";

const ReviewResult = ({
  isSmallScreen,
  fetched,
  reviews,
  fetching,
}) => {
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const { property, value, table } = useParams();
  const [isDetailedView, setIsDetailedView] = useState(false)

  useEffect(() => {
    authUser();
    loadClickedReview({
      property,
      value,
      table,
    });
  }, []);

  useEffect(() => {
    if (location !== prevLocation) {
      loadClickedReview({
        property,
        value,
        table,
      });
    }
  }, [location]);

  const sortWines = (e) => {
    if (e.target.value) {
      loadOrderedClickedReview({
        property,
        value,
        table,
        orderedProp: e.target.value,
      });
    }
  };

  return (
    <div className="content">
      <SortWines sortWines={sortWines} />
      {isDetailedView ? (
        <button
          type="button"
          onClick={() => {
            setIsDetailedView(!isDetailedView);
          }}
          className="activeButton"
        >
          Listvy
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsDetailedView(!isDetailedView);
          }}
          className="activeButton"
        >
          Detaljerad vy
        </button>
      )}
      {fetched && reviews?.data && (
        <div>
          {isDetailedView || isSmallScreen ? (
            <SearchResultDetailed
              wine={reviews}
              isSmallScreen={isSmallScreen}
            />
          ) : (
            <SearchResult wine={reviews} />
          )}
        </div>
      )}
      {fetching && <Loader />}
      {reviews?.data && reviews.data.length === 0 && <Noresult />}
    </div>
  );
};
ReviewResult.propTypes = {
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  isSmallScreen: PropTypes.bool,
  reviews: PropTypes.object,
};

const mapStateToProps = (state) => ({
  reviews: state.resultReducer.reviews,
  error: state.resultReducer.error,
  fetching: state.resultReducer.fetching,
  fetched: state.resultReducer.fetched,
  isSmallScreen: state.globalReducer.isSmallScreen,
});

export default connect(mapStateToProps, null)(ReviewResult);
