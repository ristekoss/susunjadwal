/**
*
* Header
*
*/

import React from 'react';
import { Link } from 'react-router';


import styles from './styles.css';

function Header(props) {
  const headerStyle = props.isFixed ? styles.headerFixed : styles.header;

  return (
    <div className={headerStyle}>
      <Link to={`/`}>
        <h1 className={styles.logo} >Susun<span>Jadwal</span></h1>
      </Link>
      {React.Children.toArray(props.children)}
    </div>
  );
}


Header.propTypes = {
  isFixed: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default Header;
