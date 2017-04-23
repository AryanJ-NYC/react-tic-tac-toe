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
          <p>O Score: {this.props.score['O']}</p>
          <p>X Score: {this.props.score['X']}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={this.props.newGame}>New Game</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default GameOver;
