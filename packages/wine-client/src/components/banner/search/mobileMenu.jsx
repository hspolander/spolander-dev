import React from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SimpleMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className="mobile-menu">
      <FontAwesomeIcon onClick={handleClick} icon={faBars} size="5x" />
      <Menu
        className="mobile-dropdown"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div>
          <MenuItem text="Recensioner" navTo="/reviews" />
          <MenuItem text="Vinförråd" navTo="/wines" />
          <MenuItem text="Recensera" navTo="/addReview" />
          <MenuItem text="Lägg till" navTo="/addWine" />
        </div>
      </Menu>
    </div>
  );
};

const MenuItem = ({ navTo, icon, text }) => (
  <Link className="nostyle-link" to={navTo}>
    <div className="menu-item">
      {icon && <FontAwesomeIcon icon={icon} size="3x" />}
      <i className="icon-title">{text}</i>
    </div>
  </Link>
);

export default SimpleMenu;
