import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const rootStyles = {
  height: 'auto',
  margin: 4,
};

const labelStyle = {
  fontSize: '64px',
  fontWeight: 600,
};

class Square extends Component {
  render() {
    const {
      id,
      value,
      ...other,
    } = this.props;

    return (
      <RaisedButton
        label={value || ' '}
        labelStyle={labelStyle}
        style={rootStyles}
        secondary
        {...other}
      />
    );
  }
}

export default Square;
