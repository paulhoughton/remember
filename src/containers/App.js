import 'react-mdl/extra/material';
import 'react-mdl/extra/material.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateGeo } from '../reducers/main';
import { setSetting } from '../reducers/settings';
import { geoListeners } from '../helpers/setup';

import Main from './Main';
import About from '../components/About';

import { Navigation, Layout, Drawer, Content, Header, Switch } from 'react-mdl';

import Warnings from './Warnings';

const RouteHideDrawer = ({ component: Component, ...rest }) => (
  <Route {...rest} render={() => {
    if (document.querySelector('.mdl-layout__drawer')) {
      document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
      document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
    }
    return <Component {...rest} />;
  }}/>
);

class App extends Component {
  componentWillMount() {
    geoListeners(this.props.updateGeo);
  }
  render() {
    const { km, detailed, setting } = this.props;
    return (
      <Router class="main">
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
                  onChange={(e) => setting('km', e.currentTarget.checked) }>
                  Km
                </Switch>
              </div>
              <div className="mdl-navigation__link">
                <Switch ripple
                  checked={detailed}
                  onChange={(e) => setting('detailed', e.currentTarget.checked) }>
                  Detailed
                </Switch>
              </div>
            </Navigation>
          </Drawer>
          <Content>
            <RouteHideDrawer exact path="/" component={Main} />
            <RouteHideDrawer path="/about" component={About} />
            <RouteHideDrawer path="/demo" component={() => <Main demo={true} />} />
          </Content>
        </Layout>
    </Router>);
  }
}
App.propTypes = {
  setting: PropTypes.func,
  updateGeo: PropTypes.func,
  children: PropTypes.object,
  km: PropTypes.bool,
  detailed: PropTypes.bool
};

export default connect(({ settings }) => settings, { setting: setSetting, updateGeo })(App);
