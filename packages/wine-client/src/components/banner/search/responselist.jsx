import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./search.scss";

const Responselist = (props) => {
  const navigate = useNavigate()
  const { responselist } = props;

  const handleClick = (e, data) => {
    const item = data[e.target.dataset.id];
    const path = `/reviews/${item.table}/${item.property}/${item.value}`;
    navigate(path);
  };

  const elementList = responselist.map((item, index) => (
    <li
      className="autocomplete-item"
      key={responselist[index].value}
      onClick={(e) => handleClick(e, responselist)}
      data-id={index}
    >
      {responselist[index].value}
    </li>
  ));

  return <ul>{elementList}</ul>;
};
Responselist.propTypes = {
  responselist: PropTypes.array.isRequired,
};

export default Responselist;
