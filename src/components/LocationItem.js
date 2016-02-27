import React from 'react';
import { Textfield, ListItem, ListItemContent, ListItemAction } from 'react-mdl';

const LocationItem = ({ subtitle, textField, content, onClick, children }) => (
  <ListItem
    twoLine
    onClick={onClick}>
    <ListItemContent subtitle={subtitle}>
      {textField &&
        <Textfield
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
  subtitle: React.PropTypes.string,
  textField: React.PropTypes.object,
  content: React.PropTypes.string,
  onClick: React.PropTypes.func,
  children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array])
};
export default LocationItem;
