/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="row expanded">
        <div className="small-12 columns text-center">
          <div className={styles.hero}>
            <div className={styles.posContainer}>
              <h1 className={styles.logo}>
                Susun<span>Jadwal</span>
              </h1>
              <p className={styles.subtitle}>
                <FormattedMessage {...messages.subtitle} />
              </p>
              <button className={styles.loginButton} >Login dengan SSO</button>
              <p className={styles.gabungJadwalInfo}>Ingin cari waktu kosong? Gunakan fitur <button className={styles.link}>Gabungkan Jadwal</button></p>
              <div className={styles.noticeBar}>
                <FormattedMessage {...messages.noticeMessage} />
              </div>
              <p className={styles.disclaimer}>Ini Disclaimer buat SSO, Kami menggunakan akun SSO anda seperlunya wkwk</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
