import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"

import SortWines from "./sortWines";
import { SearchResult, SearchResultDetailed, Loader, Noresult } from "./result";
import { usePrevious } from "../../hooks/hooks";

import "./result.scss";
import GetWines from "../../api/getWine";
import { useLogin, useScreenSize } from "../../contextProviders";
import LoginApi from "../../api/login";

const ReviewResult = () => {
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const { property, value, table } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [reviews, setReviews] = useState(null)
  const [isDetailedView, setIsDetailedView] = useState(false)
  const [, setIsLoggedIn] = useLogin()
  const [isSmallScreen] = useScreenSize()

  useEffect(() => {
    LoginApi.authRequest()
    .then(() => {
      setIsLoggedIn(true)
    })
    .catch(() => setIsLoggedIn(false))
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


export default ReviewResult;
