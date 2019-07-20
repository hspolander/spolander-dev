import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SortWines from './sortWines';
import { SearchResult, SearchResultDetailed, Loader, Noresult } from './result';
import {
  loadClickedReview,
  loadOrderedClickedReview,
  toggleDetailedView,
} from './actions';
import { setInitialValuesResult } from '../add/actions';
import { usePrevious } from '../../hooks';
import { authUser } from '../login/actions';
import { setScreenSize } from '../global/actions';

import './result.scss';

const ReviewResult = ({
  match,
  history,
  isSmallScreen,
  detailedView,
  fetched,
  reviews,
  location,
  fetching,
}) => {
  const prevLocation = usePrevious(location);
  useEffect(() => {
    authUser();
    const { property, value, table } = match.params;
    loadClickedReview({
      property,
      value,
      table,
    });
    if (window.innerWidth <= 1024) {
      setScreenSize(true);
    } else {
      setScreenSize(false);
    }
  }, []);

  useEffect(
    () => {
      if (location !== prevLocation) {
        const { property, value, table } = match.params;
        loadClickedReview({
          property,
          value,
          table,
        });
      }
    },
    [location],
  );

  const sortWines = e => {
    if (e.target.value) {
      loadOrderedClickedReview({
        property: match.params.property,
        value: match.params.value,
        table: match.params.table,
        orderedProp: e.target.value,
      });
    }
  };

  const loadValuesReview = values => {
    const initialValues = { ...values };
    const grapes = [];
    for (let i = 0; i < values.grapes.length; i += 1) {
      grapes.push(values.grapes[i].grape);
    }
    initialValues.grapes = grapes;
    delete initialValues.id;
    delete initialValues.reviews;
    setInitialValuesResult(initialValues);
    history.push('/addReview');
  };

  const loadValuesAddWine = values => {
    const initialValues = { ...values };
    const grapes = [];
    for (let i = 0; i < values.grapes.length; i += 1) {
      grapes.push(values.grapes[i].grape);
    }
    initialValues.grapes = grapes;
    delete initialValues.id;
    delete initialValues.reviews;
    setInitialValuesResult(initialValues);
    history.push('/addWine');
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
          className={detailedView ? 'activeButton' : 'notActiveButton'}
        >
          Detaljerad vy
        </button>
      )}
      {fetched && reviews && reviews.data && (
        <div>
          {detailedView || isSmallScreen ? (
            <SearchResultDetailed
              wine={reviews}
              loadValuesAddWine={loadValuesAddWine}
              loadValuesReview={loadValuesReview}
              isSmallScreen={isSmallScreen}
            />
          ) : (
            <SearchResult
              wine={reviews}
              loadValuesAddWine={loadValuesAddWine}
              loadValuesReview={loadValuesReview}
            />
          )}
        </div>
      )}
      {fetching && <Loader />}
      {reviews && reviews.data && reviews.data.length === 0 && <Noresult />}
    </div>
  );
};
ReviewResult.propTypes = {
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  detailedView: PropTypes.bool,
  isSmallScreen: PropTypes.bool,
  reviews: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  reviews: state.resultReducer.reviews,
  error: state.resultReducer.error,
  fetching: state.resultReducer.fetching,
  detailedView: state.resultReducer.detailedView,
  fetched: state.resultReducer.fetched,
  isSmallScreen: true,
});

export default connect(
  mapStateToProps,
  null,
)(ReviewResult);
