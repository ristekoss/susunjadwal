/*
 *
 * GabungJadwal
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectGabungJadwal from './selectors';
import styles from './styles.css';
import Header from 'components/Header';
import { addInput, delInput, changeInput, submit } from './actions';

export class GabungJadwal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    inputs: React.PropTypes.array,
    addInput: React.PropTypes.func,
    delInput: React.PropTypes.func,
    changeInput: React.PropTypes.func,
    submit: React.PropTypes.func,
  };

  render() {
    let inputsElem = [];

    this.props.inputs.map((val, idx) => {
      inputsElem.push((
        <div key={`${val}-${idx}-gabungInput`} className="small-12 columns text-center">
          <input type="text" placeholder="shortlink, cth: axEdsajnfl" value={this.props.inputs[idx].value} onChange={(evt) => this.props.changeInput(idx, evt.target.value)} />
        </div>));
    });

    return (
      <div>
        <Helmet
          title="GabungJadwal"
          meta={[
            { name: 'description', content: 'Description of GabungJadwal' },
          ]}
        />
        <Header />
        <div className="row">
          <div className="small-12 columns">
            <div className={styles.gabungJadwal}>
              <div className="row expanded">
                <div className="small-12 columns text-center">
                  <h1>Gabungkan Jadwal</h1>
                  <h2>Bingung mencari jadwal kosong untuk rapat mingguan kepanitiaan? Atau mau cari waktu irisan untuk ketemuan sama gebetan? Gabungkan saja shortlink jadwal-jadwalmu di sini!</h2>
                  <h3>kamu bisa mendapatkan shortlink untuk jadwalmu dengan menyusun jadwal dan melakukan "Simpan Jadwal". Cukup shortlink-nya saja, ya!</h3>
                </div>
                {inputsElem}
                <div className="small-12 columns text-center">
                  <button onClick={this.props.delInput} style={{ display: inputsElem.length > 2 ? 'inline-block' : 'none' }}>- Kurang</button>
                  <button onClick={this.props.addInput}>+ Tambah</button>
                  <button onClick={() => this.props.submit()}>Gabung</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectGabungJadwal();

function mapDispatchToProps(dispatch) {
  return {
    addInput: () => dispatch(addInput()),
    delInput: () => dispatch(delInput()),
    changeInput: (index, value) => dispatch(changeInput(index, value)),
    submit: () => dispatch(submit()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GabungJadwal);
