import React from 'react';
import PropTypes from 'prop-types';
import { Textfield, ListItem, ListItemContent, ListItemAction } from 'react-mdl';

const LocationItem = ({ subtitle, textField, content, onClick, children }) => (
  <ListItem
    twoLine
    onClick={onClick}>
    <ListItemContent subtitle={subtitle}>
      {textField &&
        <Textfield
          autoFocus
          label="Location"
          value={textField.value}
          onKeyDown={e => { if (e.key === 'Enter') textField.onSubmit(); } }
          onChange={e => textField.onChange(e.currentTarget.value) }/>}
      {content}
    </ListItemContent>
    <ListItemAction>
      <span>
        {children}
      </span>
    </ListItemAction>
  </ListItem>
);

LocationItem.propTypes = {
  subtitle: PropTypes.string,
  textField: PropTypes.object,
  content: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};
export default LocationItem;
