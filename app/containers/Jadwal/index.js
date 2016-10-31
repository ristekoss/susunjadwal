/*
 *
 * Jadwal
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectJadwal from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import Header from 'components/Header';

export class Jadwal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.jadwal}>
        <Helmet
          title="Jadwal"
          meta={[
            { name: 'description', content: 'Description of Jadwal' },
          ]}
        />
        <Header />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

const mapStateToProps = selectJadwal();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jadwal);
