/*
 *
 * Footer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

export class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.footer}>
        <button className={styles.link}>
          <FormattedMessage {...messages.header} />
        </button>
        <p>Maintained and &lt;/&gt; with &lt;3 By <a href="http://ristek.cs.ui.ac.id/groups/vvd.html" className={styles.link} >SIG VVeb Development Ristek Fasilkom UI</a> and <a href="http://ristek.cs.ui.ac.id/groups/uiux.html" className={styles.link} >SIG UI/UX Ristek Fasilkom UI</a> - Originally Made by <a href="https://twitter.com/PandagoStudio" className={styles.link} >@PandagoStudio</a></p>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Footer);
