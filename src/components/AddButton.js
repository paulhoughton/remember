import React from 'react';
import PropTypes from 'prop-types';
import { FABButton, Spinner, Icon } from 'react-mdl';

const style = {
  right: '15px'
};

const AddButton = ({ onClick, loading, icon = 'add' }) => (
  loading ? <Spinner className="fixed-bottom" style={ style } /> :
    <FABButton
      colored
      raised
      className="fixed-bottom"
      style={style}
      onClick={onClick}>
      <Icon name={icon} />
    </FABButton>
);

AddButton.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  icon: PropTypes.string
};

export default AddButton;
