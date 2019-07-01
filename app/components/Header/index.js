/**
*
* Header
*
*/

import React from 'react';


import styles from './styles.css';

function Header(props) {
  const headerStyle = props.isFixed ? styles.headerFixed : styles.header;

  return (
    <div className={headerStyle}>
      <h1 className={styles.logo} >Susun<span>Jadwal</span></h1>
      {React.Children.toArray(props.children)}
      {/* <div className={styles.divider} /> */}
    </div>
  );
}


Header.propTypes = {
  isFixed: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default Header;
