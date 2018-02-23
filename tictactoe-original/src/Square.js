import React, { Component } from 'react';

class Square extends Component {
  render() {
    const {
      onClick,
      value,
    } = this.props;

    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
  }
}

export default Square;
