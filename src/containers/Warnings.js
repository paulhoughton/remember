import React from 'react';
import { Tooltip, Icon } from 'react-mdl';
import { connect } from 'react-redux';

class Warnings extends React.Component {
  render() {
    const { orientation, accuracy, lastUpdate } = this.props;
    const warning = ({ message, icon, color = 'white' }) => (
        <Tooltip
                key={icon}
                label={message}>
            <Icon
                name={icon}
                style={{ color, height: '35px' }}
            />
        </Tooltip>);

    let warnings = [];
    if (orientation === null) {
      warnings.push(warning({
        icon: 'navigation',
        message: 'Orientation unavailable' }));
    }
    if (accuracy > 100) {
      warnings.push(warning({
        message: `Inaccurate location: ${accuracy}m`,
        icon: 'error' }));
    }
    if (lastUpdate && new Date() - lastUpdate > 30000) {
      warnings.push(warning({
        message: `Out of date location: ${Math.floor((new Date() - lastUpdate) / 1000)}s`,
        icon: 'location_searching' }));
    }

    return (
        <span style={{ paddingLeft: '15px' }}>{warnings}</span>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.main.geo
  };
};

Warnings.propTypes = {
  orientation: React.PropTypes.number,
  accuracy: React.PropTypes.number,
  lastUpdate: React.PropTypes.number,
  dispatch: React.PropTypes.func
};

export default connect(mapStateToProps)(Warnings);

