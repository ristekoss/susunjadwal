/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';

import selectGlobal from './selectors';
import styles from './styles.css';

import Footer from 'containers/Footer';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
    loading: React.PropTypes.bool,
  };

  render() {
    return (
      <div className={styles.container}>
        <div className="loadingScreen" style={{ display: this.props.loading ? 'block' : 'none' }}>
          <div className="container">
            <div className="centralizer text-center">
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
              <h1>Loading, building up your request...</h1>
            </div>
          </div>
        </div>
        {React.Children.toArray(this.props.children)}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = selectGlobal();

export default connect(mapStateToProps, null)(App);
