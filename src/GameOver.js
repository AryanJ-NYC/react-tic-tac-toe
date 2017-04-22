import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

class GameOver extends Component {
  render() {
    const message = (this.props.winner === 'D') ? 'It\'s a Draw!' : `${this.props.winner} Wins!`;
    return (
      <Modal show={this.props.showGameOverModal} >
        <Modal.Header>
          <Modal.Title>GAME OVER!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>{message}</h4>
        </Modal.Body>
      </Modal>
    )
  }
}

export default GameOver;