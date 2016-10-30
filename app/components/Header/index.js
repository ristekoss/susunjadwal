/**
*
* Header
*
*/

import React from 'react';


import styles from './styles.css';

function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.logo} >Susun<span>Jadwal</span></h1>
      <div className={styles.divider} />
    </div>
  );
}

export default Header;
