import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddReviewForm from './addReviewForm';
import SearchSysForm from './searchSysForm';
import SearchSysResult from './searchSysResult';
import { setScreenSize } from '../global/actions';
import { usePrevious } from '../../hooks';
import { authUser } from '../login/actions';
import {
  sendLoadSystembolagetReviewRow,
  sendLoadSystembolagetImage,
  showImageOfWine,
  hideImageOfWine,
} from './actions';
import './add.scss';

export const AddReview = ({
  systemWineData,
  isSmallScreen,
  formValues,
}) => {
  const resultNode = useRef();
  const formNode = useRef();
  const prevData = usePrevious({ systemWineData, formValues });

  useEffect(
    () => {
      authUser();
      if (window.innerWidth <= 1024) {
        setScreenSize(true);
      } else {
        setScreenSize(false);
      }
    },
    [],
  );

  const scrollTo = node => {
    node.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(
    () => {
      if (prevData) {
        if (!prevData.systemWineData) {
          scrollTo(resultNode);
        }
      }
    },
    [systemWineData],
  );

  useEffect(
    () => {
      if (prevData) {
        scrollTo(formNode);
      }
    },
    [formValues],
  );

  return (
    <div className="content">
      <div className="add-wine">
        <div className="formtitle" ref={formNode}>
          <span>Skriv recension</span>
        </div>
        <AddReviewForm />
        <div className="formtitle">
          <span>Sök i systembolagets sortiment</span>
        </div>
        <SearchSysForm />
        {systemWineData && (
          <div ref={resultNode}>
            {systemWineData.length > 0 ? (
              <SearchSysResult
                sendLoadSystembolagetRow={sendLoadSystembolagetReviewRow}
                sendLoadSystembolagetImage={sendLoadSystembolagetImage}
                showImageOfWine={showImageOfWine}
                hideImageOfWine={hideImageOfWine}
                systemWineData={systemWineData}
                isSmallScreen={isSmallScreen}
              />
            ) : (
              <p>Inget resultat på din sökning</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
AddReview.propTypes = {
  navigatedInitialValues: PropTypes.object,
  isSmallScreen: PropTypes.bool.isRequired,
  formValues: PropTypes.object,
  systemWineData: PropTypes.array,
};

const mapStateToProps = state => ({
  data: state.addReducer.data,
  error: state.addReducer.error,
  fetching: state.addReducer.fetching,
  fetched: state.addReducer.fetched,
  formValues: state.addReducer.initialValue,
  systemWineData: state.addReducer.systemWineData,
  isSmallScreen: state.globalReducer.isSmallScreen,
});

export default connect(
  mapStateToProps,
  null,
)(AddReview);
