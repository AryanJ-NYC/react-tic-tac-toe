import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

class GameOver extends Component {
  render() {
    return (
      <Modal show={this.props.showGameOverModal} >
        <Modal.Header>
          <Modal.Title>GAME OVER!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>{this.props.winner} Wins!</h4>
        </Modal.Body>
      </Modal>
    )
  }
}

export default GameOver;