import 'react-mdl/extra/material';
import 'react-mdl/extra/material.css';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Navigation, Layout, Drawer, Content, Header, Switch } from 'react-mdl';

import Warnings from './Warnings';

class App extends React.Component {
  render() {
    const { km, detailed, children, dispatch } = this.props;
    return (
      <div style={{ height: '100vh', position: 'relative' }}>
        <Layout fixedHeader>
          <Header title={
            <span style={{ color: 'white' }}>
              Remember
              <Warnings />
            </span>} />
          <Drawer title="Remember">
            <Navigation>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/demo">Demo</Link>
              <div className="mdl-navigation__link">
                <Switch ripple
                  checked={km}
                  onChange={(e) => dispatch({ type: 'SETTINGS', field: 'km', value: e.currentTarget.checked }) }>
                    Km
                </Switch>
              </div>
              <div className="mdl-navigation__link">
                <Switch ripple
                  checked={detailed}
                  onChange={(e) => dispatch({ type: 'SETTINGS', field: 'detailed', value: e.currentTarget.checked }) }>
                    Detailed
                </Switch>
              </div>
            </Navigation>
          </Drawer>
          <Content>{children}</Content>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func,
  children: React.PropTypes.object,
  km: React.PropTypes.bool,
  detailed: React.PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    ...state.settings
  };
};

export default connect(mapStateToProps)(App);
