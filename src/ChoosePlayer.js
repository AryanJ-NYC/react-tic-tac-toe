import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

class ChoosePlayer extends Component {
  constructor() {
    super();
    this.CIRCLE = 'O';
    this.EX = 'X';

    this.state = { showModal: true };
    this.onClick = this.onClick.bind(this);
  }

  onClick(playerChoice) {
    this.props.onChoice(playerChoice);
    this.state = { showModal: false };
  }

  render() {
    const buttonStyle = {
      border: '1px solid black',
      fontSize: '15vw'
    };

    return (
      <Modal show={this.state.showModal} >
        <Modal.Header>
          <Modal.Title>O or X?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container-fluid">
            <button onClick={() => this.onClick(this.CIRCLE)} className="btn col-xs-6" style={buttonStyle}>
              {this.CIRCLE}
            </button>
            <button onClick={() => this.onClick(this.EX)} className="btn col-xs-6" style={buttonStyle}>
              {this.EX}
            </button>
          </div>
        </Modal.Body>

        <Modal.Footer style={{textAlign: 'left'}}>
          <div className="container-fluid">
            <p>
              <em>Instructions</em><br/>
              Click or tap where you'd like to move.  Humans go first.  Play will alternate each game.
            </p>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ChoosePlayer;
