import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faCartPlus, faBars, faFlask, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className="mobile-menu">
      <FontAwesomeIcon onClick={handleClick} icon={faBars} size='5x' />
      <Menu
        className="mobile-dropdown"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
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
      </Menu>
    </div>
  );
};

const MenuIcon = ({ navTo, icon, text }) => (
    <Link className="nostyle-link" to={navTo}>
      <div className="menu-item">
        <FontAwesomeIcon icon={icon} size='3x' />
        <i className="icon-title">{text}</i>
      </div>
    </Link>
  );