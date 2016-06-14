import 'react-mdl/extra/material';
import 'react-mdl/extra/material.css';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setSetting } from '../reducers/settings';

import { Navigation, Layout, Drawer, Content, Header, Switch } from 'react-mdl';

import Warnings from './Warnings';

const App = ({ km, detailed, children, setting }) => (
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
      <Content>{children}</Content>
    </Layout>
  </div>
);

App.propTypes = {
  setting: PropTypes.func,
  children: PropTypes.object,
  km: PropTypes.bool,
  detailed: PropTypes.bool
};

export default connect(({ settings }) => settings, { setting: setSetting })(App);
