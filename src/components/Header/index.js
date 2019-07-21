import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./styles.css";

function Header(props) {
  const headerClassName = props.isFixed ? "headerFixed" : "header";

  return (
    <div className={headerClassName}>
      <Link to={`/`}>
        <h1 className="logo">
          Susun<span>Jadwal</span>
        </h1>
      </Link>
      {props.children}
    </div>
  );
}

Header.propTypes = {
  isFixed: PropTypes.bool,
  children: PropTypes.node
};

export default Header;
