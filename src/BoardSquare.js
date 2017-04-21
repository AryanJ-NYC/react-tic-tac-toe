import React, { Component } from 'react';

class BoardSquare extends Component {
  render() {
    return (
      <a onClick={this.props.onClick}>Hello, World</a>
    );
  }
}

export default BoardSquare;
