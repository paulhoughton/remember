import 'react-mdl/extra/material';
import 'react-mdl/extra/material.css';

import React, { Component, PropTypes } from 'react';
import { HashRouter, Match, Link } from 'react-router';
import { connect } from 'react-redux';
import { updateGeo } from '../reducers/main';
import { setSetting } from '../reducers/settings';
import { geoListeners } from '../helpers/setup';

import Main from './Main';
import About from '../components/About';

import { Navigation, Layout, Drawer, Content, Header, Switch } from 'react-mdl';

import Warnings from './Warnings';

class MatchAndHideDrawer extends Component {
  componentWillUpdate() {
    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
    document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
  }
  render() {
    return <Match {...this.props} />;
  }
}

class App extends Component {
  componentWillMount() {
    geoListeners(this.props.updateGeo);
  }
  render() {
    const { km, detailed, setting } = this.props;
    return (
      <HashRouter class="main">
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
            <MatchAndHideDrawer exactly pattern="/" component={Main} />
            <MatchAndHideDrawer pattern="/about" component={About} />
            <MatchAndHideDrawer pattern="/demo" component={() => <Main demo={true} />} />
          </Content>
        </Layout>
    </HashRouter>);
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
