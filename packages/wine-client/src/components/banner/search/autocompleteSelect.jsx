import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useOnClickOutside } from "../../../hooks";
import Responseheader from "./responseheader";
import Responselist from "./responselist";

import "./search.scss";

const AutocompleteSelect = ({ autocompleteSelect }) => {
  const { data } = autocompleteSelect;
  const [collapsed, onClickOutside] = useState(false);
  const responsedivs = [];

  const dropdownNode = useRef();
  useOnClickOutside(dropdownNode, () => onClickOutside(true));

  useEffect(() => {
    dropdownNode.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [data]);

  Object.keys(data).forEach((responsetype) => {
    const responselist = autocompleteSelect.data[responsetype];
    responsedivs.push(
      <li key={responsetype} onClick={() => onClickOutside(true)}>
        <Responseheader responseheader={responsetype} />
        <Responselist responselist={responselist} />
      </li>
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
  autocompleteSelect: PropTypes.object,
};

export default AutocompleteSelect;
