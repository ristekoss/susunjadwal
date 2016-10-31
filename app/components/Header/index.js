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
      <div className={styles.divider} />
    </div>
  );
}


Header.propTypes = {
  isFixed: React.PropTypes.bool,
};

export default Header;
