import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SortWines from "./sortWines";
import { SearchResult, SearchResultDetailed, Loader, Noresult } from "./result";
import {
  loadCellarOrdered,
  loadCellar,
  removeWineFromCellar,
  toggleDetailedView,
} from "./actions";
import { setInitialValuesResult } from "../add/actions";
import { setScreenSize } from "../global/actions";

import "./result.scss";

const WineResult = ({
  isSmallScreen,
  detailedView,
  fetched,
  wines,
  fetching,
  history,
}) => {
  useEffect(() => {
    loadCellar();
    if (window.innerWidth <= 1024) {
      setScreenSize(true);
    } else {
      setScreenSize(false);
    }
  }, []);

  const sortWines = (e) => {
    if (e.target.value) {
      loadCellarOrdered({ orderedProp: e.target.value });
    }
  };

  const loadValuesReview = ({ wine }) => {
    const grapes = [];
    for (let i = 0; i < wine.grapes.length; i += 1) {
      grapes.push(wine.grapes[i].grape);
    }
    wine.grapes = grapes;
    delete wine.id;
    delete wine.reviews;
    setInitialValuesResult(wine);
    history.push("/addReview");
  };

  const loadValuesAddWine = ({ wine }) => {
    const grapes = [];
    for (let i = 0; i < wine.grapes.length; i += 1) {
      grapes.push(wine.grapes[i].grape);
    }
    wine.grapes = grapes;
    delete wine.id;
    delete wine.reviews;
    setInitialValuesResult(wine);
    history.push("/addWine");
  };

  const removeFromCellar = (id) => {
    removeWineFromCellar(id);
    loadCellar();
  };

  return (
    <div className="content">
      <SortWines sortWines={sortWines} />
      {!isSmallScreen && (
        <button
          type="button"
          onClick={() => {
            toggleDetailedView();
          }}
          className={detailedView ? "activeButton" : "notActiveButton"}
        >
          Detaljerad vy
        </button>
      )}
      {fetched && wines && wines.data && (
        <div>
          {detailedView || isSmallScreen ? (
            <SearchResultDetailed
              wine={wines}
              removeFromCellar={removeFromCellar}
              loadValuesAddWine={loadValuesAddWine}
              loadValuesReview={loadValuesReview}
              isSmallScreen={isSmallScreen}
            />
          ) : (
            <SearchResult
              wine={wines}
              removeFromCellar={removeFromCellar}
              loadValuesAddWine={loadValuesAddWine}
              loadValuesReview={loadValuesReview}
            />
          )}
        </div>
      )}
      {fetching && <Loader />}
      {wines && wines.data && wines.data.length === 0 && <Noresult />}
    </div>
  );
};
WineResult.propTypes = {
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  detailedView: PropTypes.bool,
  isSmallScreen: PropTypes.bool,
  wines: PropTypes.object,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  wines: state.resultReducer.wines,
  error: state.resultReducer.error,
  fetching: state.resultReducer.fetching,
  detailedView: state.resultReducer.detailedView,
  isSmallScreen: state.globalReducer.isSmallScreen,
  fetched: state.resultReducer.fetched,
  setScreenSize: true,
});

export default connect(mapStateToProps, null)(WineResult);
