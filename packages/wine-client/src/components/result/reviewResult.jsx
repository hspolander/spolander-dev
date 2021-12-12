import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams, useLocation } from "react-router-dom"

import SortWines from "./sortWines";
import { SearchResult, SearchResultDetailed, Loader, Noresult } from "./result";
import { usePrevious } from "../../hooks/hooks";
import { authUser } from "../login/actions";

import "./result.scss";
import GetWines from "../../api/getWine";

const ReviewResult = ({
  isSmallScreen,
}) => {
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const { property, value, table } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [reviews, setReviews] = useState(null)
  const [isDetailedView, setIsDetailedView] = useState(false)

  useEffect(() => {
    authUser();
    setIsLoading(true)
    GetWines.all({
      property,
      value,
      table,
      orderedProp: "score",
    })
    .then((reviewResponse) => setReviews(reviewResponse))
    .finally(() => setIsLoading(false))
  }, []);

  useEffect(() => {
    if (location !== prevLocation) {
      GetWines.all({
        property,
        value,
        table,
        orderedProp: "score",
      })
      .then((reviewResponse) => setReviews(reviewResponse))
      .finally(() => setIsLoading(false))
    }
  }, [location]);

  const sortWines = (e) => {
    if (e.target.value) {
      GetWines.all({
        property,
        value,
        table,
        orderedProp: e.target.value,
      })
      .then((reviewResponse) => setReviews(reviewResponse))
      .finally(() => setIsLoading(false))
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
      {!isLoading && reviews && (
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
      {isLoading && <Loader />}
      {reviews && reviews.length === 0 && <Noresult />}
    </div>
  );
};
ReviewResult.propTypes = {
  isSmallScreen: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isSmallScreen: state.globalReducer.isSmallScreen,
});

export default connect(mapStateToProps, null)(ReviewResult);
