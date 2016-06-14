import React, { PropTypes } from 'react';
import { Tooltip, Icon } from 'react-mdl';
import { connect } from 'react-redux';

const Warnings = ({ orientation, accuracy, lastUpdate }) => {
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

  return <span style={{ paddingLeft: '15px' }}>{warnings}</span>;
};

Warnings.propTypes = {
  orientation: PropTypes.number,
  accuracy: PropTypes.number,
  lastUpdate: PropTypes.number
};

export default connect(({ main }) => main.geo)(Warnings);

