import React, { Component } from 'react';

class BoardSquare extends Component {
  render() {
    return (
      <a onClick={this.props.onClick}>
        {this.props.value}
      </a>
    );
  }
}

export default BoardSquare;
