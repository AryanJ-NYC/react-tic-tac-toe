import React, { Component } from 'react';

class BoardSquare extends Component {
  render() {
    const styles = {
      fontSize: '15vw',
      display: 'block',
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'
    };
    return (
      <p className="text-lg-center" onClick={this.props.onClick} style={styles}>
        {this.props.value}
      </p>
    );
  }
}

export default BoardSquare;
