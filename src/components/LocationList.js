import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, List } from 'react-mdl';
import { calcDistances } from '../helpers/location';
import { DEMO_DATA, KM2MILES } from '../constants';
import LocationItem from './LocationItem';
import Direction from './Direction';

const LocationList = ({ geo, locations, selected, current, demo, settings, actions }) => {
  const locationsToDisplay = !demo ? locations : DEMO_DATA.map(calcDistances(geo.latitude, geo.longitude));

  return (
    <List>
      {(current.editing && !demo) && (
        <LocationItem
          key={0}
          textField = {{
            value: current.description,
            onSubmit: () => actions.addCurrent(),
            onChange: e => actions.currentLocationDesc(e)
          }} >
            <IconButton name="add" onClick={actions.addCurrent}/>
            <IconButton name="cancel" onClick={() => actions.showNewLocation(false) }/>
        </LocationItem>)
      }

    {locationsToDisplay.sort((a, b) => a.dist > b.dist)
    .map((location, i) => {
      if (selected.index === location.index) {
        return (
          <LocationItem
            key={i}
            textField ={{ value: selected.text,
            onSubmit: () => actions.confirmSelected(),
            onChange: (e) => actions.setSelectedText(e) }}>
              <IconButton name="check" onClick={actions.confirmSelected}/>
              <IconButton name="delete" onClick={actions.deleteSelected}/>
              <IconButton name="cancel" onClick={() => actions.setSelected(null)}/>
          </LocationItem>);
      }
      return (
        <LocationItem
          key={i}
          subtitle = { (settings.detailed ? `(${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}) ` : '') +
            (isNaN(location.dist) ? '' : (location.dist * (settings.km ? 1 : KM2MILES)).toFixed(1)) }
          onClick={() => {!demo && actions.setSelected(location.index);}}
          content = {location.desc}>
            <Direction geo={geo} {...location} />
        </LocationItem>);
    })
  }
</List>);};

LocationList.propTypes = {
  geo: PropTypes.object,
  locations: PropTypes.array,
  selected: PropTypes.object,
  current: PropTypes.object,
  demo: PropTypes.bool,
  settings: PropTypes.object,
  actions: PropTypes.object
};

export default LocationList;
