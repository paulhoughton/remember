import React, { PropTypes } from 'react';
import { IconButton, List } from 'react-mdl';
import { calcDistances } from '../helpers/location';
import { DEMO_DATA, KM2MILES } from '../constants';
import LocationItem from './LocationItem';
import Direction from './Direction';

const LocationList = ({ geo, locations, selected, current, demo, settings, dispatch }) => {
  if (demo) {
    locations = DEMO_DATA.map(calcDistances(geo.latitude, geo.longitude));
  }
  return (
    <List>
      {(current.editing && !demo) && (
        <LocationItem
          key={0}
          textField = {{
            value: current.description,
            onSubmit: () => dispatch({ type: 'ADD_CURRENT' }),
            onChange: e => dispatch({ type: 'CURRENT_LOCATION_DESC', desc: e })
          }} >
            <IconButton name="add" onClick={() => dispatch({ type: 'ADD_CURRENT' })}/>
            <IconButton name="cancel" onClick={() => dispatch({ type: 'SHOW_NEW_LOCATION', show: false })}/>
        </LocationItem>)
      }

    {locations.sort((a, b) => a.dist > b.dist)
    .map((location, i) => {
      if (selected.index === location.index) {
        return (
          <LocationItem
            key={i}
            textField ={{ value: selected.text,
            onSubmit: () => dispatch({ type: 'CONFIRM_SELECTED' }),
            onChange: (e) => dispatch({ type: 'SET_SELECTED_TEXT', desc: e }) }}>
              <IconButton name="check" onClick={() => dispatch({ type: 'CONFIRM_SELECTED' })}/>
              <IconButton name="delete" onClick={() => dispatch({ type: 'DELETE_SELECTED' })}/>
              <IconButton name="cancel" onClick={() => dispatch({ type: 'SET_SELECTED', id: null })}/>
          </LocationItem>);
      }
      return (
        <LocationItem
          key={i}
          subtitle = { (settings.detailed ? `(${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}) ` : '') +
            (isNaN(location.dist) ? '' : (location.dist * (settings.km ? 1 : KM2MILES)).toFixed(1)) }
          onClick={() => {!demo && dispatch({ type: 'SET_SELECTED', id: location.index });}}
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
  dispatch: PropTypes.func
};

export default LocationList;
