import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { calcDistances } from '../helpers/location';

import LocationList from '../components/LocationList';
import AddButton from '../components/AddButton';

class Main extends Component {

  componentWillMount() {
    navigator.geolocation.watchPosition(position => {
      this.props.dispatch({
        type: 'UPDATE_GEO',
        geo: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          lastUpdate: position.timestamp,
          accuracy: Math.floor(position.coords.accuracy)
        }
      });
    },
    (err) => console.log('Unable to find position', err),
      {
        enableHighAccuracy: true,
        timeout: 15000
      }
    );

    window.addEventListener('deviceorientation', (event) => {
      if (event.alpha !== null && Math.floor(event.alpha) !== this.props.geo.orientation) {
        this.props.dispatch({
          type: 'UPDATE_GEO',
          geo: {
            orientation: Math.floor(event.alpha)
          }
        });
      }
    }, true);
  }

  render() {
    const { geo, current, settings, dispatch } = this.props;
    const { latitude, longitude, orientation } = geo;
    return (<div>
        {settings.detailed && latitude &&
            <div className="fixed-bottom"
                style={{ left: '15px', backgroundColor: 'white' }} >
                    ({latitude.toFixed(4)}, {longitude.toFixed(4)}) {orientation}°
            </div>
        }
            <LocationList {...this.props} demo={this.props.route.demo} />
            {(!current.editing && !this.props.route.demo) &&
                (<AddButton
                    loading={!latitude}
                    onClick={() => {
                      dispatch({
                        type: 'SHOW_NEW_LOCATION', show: true
                      });
                    } }
                />)}
        </div>);
  }
}

const mapStateToProps = (state) => ({
  ...state.main,
  settings: state.settings,
  locations: state.main.locations.map(calcDistances(state.main.geo.latitude, state.main.geo.longitude))
});

Main.propTypes = {
  dialog: PropTypes.object,
  route: PropTypes.object,
  dispatch: PropTypes.func,
  geo: PropTypes.object,
  settings: PropTypes.object,
  current: PropTypes.object
};

export default connect(mapStateToProps)(Main);
