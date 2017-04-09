import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { calcDistances } from '../helpers/location';

import * as MainActions from '../reducers/main';

import LocationList from '../components/LocationList';
import AddButton from '../components/AddButton';

const Main = (props) => {
  const { actions, current, settings, demo, geo: { latitude, longitude, orientation } } = props;
  return (
    <div>
      {settings.detailed && latitude &&
        <div className="fixed-bottom"
          style={{ left: '15px', backgroundColor: 'white' }} >
          ({latitude.toFixed(4) }, {longitude.toFixed(4) }) {orientation}°
        </div>
    }
    <LocationList {...props} />
    {!current.editing && !demo &&
        (<AddButton
            loading={!latitude}
            onClick={() => actions.showNewLocation(true)}
        />)}
</div>);
};

const mapStateToProps = ({ main, settings }) => ({
  ...main,
  settings,
  locations: main.locations.map(calcDistances(main.geo.latitude, main.geo.longitude))
});

Main.propTypes = {
  demo: PropTypes.bool,
  dialog: PropTypes.object,
  route: PropTypes.object,
  geo: PropTypes.object,
  settings: PropTypes.object,
  current: PropTypes.object,
  actions: PropTypes.object
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(MainActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
