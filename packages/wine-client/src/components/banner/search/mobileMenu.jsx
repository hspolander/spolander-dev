import React from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SimpleMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <MenuItem
            handleClose={handleClose}
            text="Recensioner"
            navTo="/reviews"
          />
          <MenuItem
            handleClose={handleClose}
            text="Recensera"
            navTo="/"
          />
        </div>
      </Menu>
    </div>
  );
};

const MenuItem = ({ navTo, icon, text, handleClose }) => (
  <Link className="nostyle-link" to={navTo} onClick={() => handleClose()}>
    <div className="menu-item">
      {icon && <FontAwesomeIcon icon={icon} size="3x" />}
      <i className="icon-title">{text}</i>
    </div>
  </Link>
);

export default SimpleMenu;
