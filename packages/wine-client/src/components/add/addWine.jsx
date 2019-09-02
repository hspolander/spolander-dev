import React, { useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddWineForm from './addWineForm';
import { usePrevious } from '../../hooks';
import SearchSysForm from './searchSysForm';
import SearchSysResult from './searchSysResult';
import {
  sendLoadSystembolagetAddRow,
  sendLoadSystembolagetImage,
  showImageOfWine,
  hideImageOfWine,
} from './actions';

import { authUser } from '../login/actions';
import { setScreenSize } from '../global/actions';

import './add.scss';

export const AddWine = ({ systemWineData, isSmallScreen, formValues }) => {
  const resultNode = useRef();
  const formNode = useRef();
  const prevData = usePrevious({ systemWineData, formValues });

  useEffect(() => {
    authUser();
    if (window.innerWidth <= 1024) {
      setScreenSize(true);
    } else {
      setScreenSize(false);
    }
  }, []);

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
        if (!prevData.formValues) {
          scrollTo(formNode);
        }
      }
    },
    [formValues],
  );

  return (
    <div className="content">
      <div className="add-wine">
        <div className="formtitle" ref={formNode}>
          <span>Lägg till vin</span>
        </div>
        <AddWineForm />
        <div className="formtitle">
          <span>Sök i systembolagets sortiment</span>
        </div>
        <SearchSysForm />
        {systemWineData && (
          <div ref={resultNode}>
            {systemWineData.length > 0 ? (
              <SearchSysResult
                sendLoadSystembolagetRow={sendLoadSystembolagetAddRow}
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
AddWine.propTypes = {
  systemWineData: PropTypes.array,
  formValues: PropTypes.object,
  navigatedInitialValues: PropTypes.object,
  isSmallScreen: PropTypes.bool,
};

const mapStateToProps = state => ({
  data: state.addReducer.data,
  error: state.addReducer.error,
  fetching: state.addReducer.fetching,
  fetched: state.addReducer.fetched,
  formValues: state.addReducer.initialValue,
  isSmallScreen: state.globalReducer.isSmallScreen,
  systemWineData: state.addReducer.systemWineData,
});

export default connect(
  mapStateToProps,
  null,
)(AddWine);
