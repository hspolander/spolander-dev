import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faCartPlus, faFlask, faSearch } from '@fortawesome/free-solid-svg-icons'

import MobileMenu from './mobileMenu';
import AutocompleteSelect from './autocompleteSelect';
import loadAutocompleteSearch from './actions';

import './search.scss';

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { ...props } = this.props;
    props.loadAutocompleteSearch(e.target.value);
  }

  render() {
    const { match, data, fetched, isSmallScreen } = this.props;
    return (
      <div className="banner-search center-parent">
        <input
          type="text"
          placeholder="Sök"
          onChange={this.handleChange}
          className={match ? 'match' : 'noMatch'}
        />
        {fetched && <AutocompleteSelect autocompleteSelect={data} />}
        { isSmallScreen ?
          <MobileMenu />
        :
        <div className="menu-items">
          <MenuIcon faFamily="fas" icon={faSearch} text="Recensioner" navTo="/reviews" />
          <MenuIcon faFamily="fas" icon={faFlask} text="Vinförråd" navTo="/wines" />
          <MenuIcon
            faFamily="far"
            icon={faComment}
            text="Recensera"
            navTo="/addReview"
          />
          <MenuIcon
            faFamily="fas"
            icon={faCartPlus}
            text="Lägg till i vinförråd"
            navTo="/addWine"
          />
        </div>}
      </div>
    );
  }
}
Search.propTypes = {
  match: PropTypes.bool,
  data: PropTypes.object,
  loadAutocompleteSearch: PropTypes.func,
  fetched: PropTypes.bool,
};

const mapStateToProps = state => ({
  isSmallScreen: state.globalReducer.isSmallScreen,
  data: state.searchbarReducer.data,
  error: state.searchbarReducer.error,
  fetching: state.searchbarReducer.fetching,
  fetched: state.searchbarReducer.fetched,
  match: state.searchbarReducer.match,
});

const mapDispatchToProps = {
  loadAutocompleteSearch,
};

const MenuIcon = ({ navTo, icon, text }) => (
  <Link className="nostyle-link" to={navTo}>
    <div className="menu-item">
      <FontAwesomeIcon icon={icon} size='3x' />
      <i className="icon-title">{text}</i>
    </div>
  </Link>
);
MenuIcon.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string,
  navTo: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
