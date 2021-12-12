import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import MobileMenu from "./mobileMenu";
import AutocompleteSelect from "./autocompleteSelect";

import "./search.scss";
import SuperSearch from "../../../api/search";
import { useScreenSize } from "../../../contextProviders";

const Search = () => {
  const [autocomplete, setAutocomplete] = useState(null)
  const [isSmallScreen] = useScreenSize()

  const handleChange = (e) => {
    if (e?.target?.value.length > 1) {
      SuperSearch.autocomplete(e?.target?.value)
      .then((autocompleteResponse) => {
        setAutocomplete(autocompleteResponse)
      })
    } else {
      setAutocomplete(null)
    }
  };

  return (
    <div className="banner-search center-parent">
      <input
        type="text"
        placeholder="Sök"
        onChange={handleChange}
        className={autocomplete === null || Object.keys(autocomplete).length > 0 ? "match" : "noMatch"}
      />
      {autocomplete && <AutocompleteSelect autocompleteObjects={autocomplete} />}
      {isSmallScreen ? (
        <MobileMenu />
      ) : (
        <div className="menu-items">
          <MenuIcon
            faFamily="fas"
            icon={faSearch}
            text="Recensioner"
            navTo="/reviews"
          />
          <MenuIcon
            faFamily="far"
            icon={faComment}
            text="Recensera"
            navTo="/"
          />
        </div>
      )}
    </div>
  );
};


const MenuIcon = ({ navTo, icon, text }) => (
  <Link className="nostyle-link" to={navTo}>
    <div className="menu-item">
      <FontAwesomeIcon icon={icon} size="3x" />
      <i className="icon-title">{text}</i>
    </div>
  </Link>
);
MenuIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  navTo: PropTypes.string.isRequired,
};

export default Search;
