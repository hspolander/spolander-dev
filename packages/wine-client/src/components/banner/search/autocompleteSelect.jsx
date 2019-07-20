import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Responseheader from './responseheader';
import Responselist from './responselist';

import './search.scss';

const useOnClickOutside = (ref, handler) => {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler],
  );
};

const AutocompleteSelect = ({ autocompleteSelect }) => {
  const [collapsed, onClickOutside] = useState(false);
  const dropdownNode = useRef();
  useOnClickOutside(dropdownNode, () => onClickOutside(true));
  const { data } = autocompleteSelect;
  const responsedivs = [];
  useEffect(
    () => {
      dropdownNode.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    [data],
  );

  Object.keys(data).forEach(responsetype => {
    const responselist = autocompleteSelect.data[responsetype];
    responsedivs.push(
      <li key={responsetype}>
        <Responseheader responseheader={responsetype} />
        <Responselist responselist={responselist} />
      </li>,
    );
  });
  return (
    <div ref={dropdownNode} className="autocomplete-select">
      {!collapsed && (
        <ul className="autocomplete-result noSelect">{responsedivs}</ul>
      )}
    </div>
  );
};

AutocompleteSelect.propTypes = {
  navigated: PropTypes.bool,
  autocompleteSelect: PropTypes.object,
};

const mapStateToProps = state => ({
  navigated: state.searchbarReducer.fetching,
});

export default connect(
  mapStateToProps,
  null,
)(AutocompleteSelect);
