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
  constructor() {
    super();

    this.state = {
      modalVisibility: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      modalVisibility: !this.state.modalVisibility,
    });
  }

  render() {
    return (
      <div className={styles.footer}>
        <div className={styles.modal} style={{ display: this.state.modalVisibility ? 'block' : 'none' }}>
          <div className={styles.container}>
            <div className={styles.modalContent}>
              <div className={styles.container}>
                <h1>Saat ini, SusunJadwal hanya menyediakan jadwal untuk mahasiswa UI S1 reguler.<br /><br />Data dari fakultas selain Fasilkom saat ini hanya dapat menyamai jadwal pada menu "Jadwal Kuliah Keseluruhan" pada SIAK-NG. Pengembang tidak dapat menjamin kelengkapan dan keakuratan data (karena itu "eksperimental"). Selama kami tidak memiliki akses ke akun jurusan lain, maka kami hanya dapat mengandalkan sumber tersebut. Harap maklum.<br /><br />Selamat mempersiapkan jadwal semester ini!</h1>
                <button onClick={this.toggleModal}>X</button>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.link} onClick={this.toggleModal}>
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
