import React from 'react';
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
  onClick: React.PropTypes.func,
  loading: React.PropTypes.bool,
  icon: React.PropTypes.string
};

export default AddButton;
