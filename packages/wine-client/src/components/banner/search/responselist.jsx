import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./search.scss";

const Responselist = (props) => {
  const { history, responselist } = props;

  const handleClick = (e, data) => {
    const item = data[e.target.dataset.id];
    const path = `/reviews/${item.table}/${item.property}/${item.value}`;
    history.push(path);
  };

  let elementList = responselist.map((item, index) => (
    <li
      className="autocomplete-item"
      key={index}
      onClick={(e) => handleClick(e, responselist)}
      data-id={index}
    >
      {responselist[index].value}
    </li>
  ));

  return <ul>{elementList}</ul>;
};
Responselist.propTypes = {
  responselist: PropTypes.array,
  history: PropTypes.object,
};

export default withRouter(Responselist);
