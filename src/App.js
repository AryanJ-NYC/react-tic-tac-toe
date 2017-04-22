import React, { Component } from 'react';
import ChoosePlayer from './ChoosePlayer';
import GameOver from './GameOver';
import TTTBoard from './TTTBoard';

class App extends Component {
  constructor() {
    super();
    this.CIRCLE = 'O';
    this.EX = 'X';

    this.setPlayer = this.setPlayer.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.toggleTurn = this.toggleTurn.bind(this);
    this.state = {
      currentPlayer: null,
      score: {'X': 0, 'O': 0},
      showGameOverModal: false
    };
  }

  setPlayer(playerChoice) {
    this.setState({currentPlayer: playerChoice});
  }

  gameOver(winner) {
    this.setState({showGameOverModal: true, winner: winner});
  }

  toggleTurn() {
    const currentPlayer = (this.state.currentPlayer === this.CIRCLE) ? this.EX : this.CIRCLE;
    this.setState({ currentPlayer: currentPlayer });
  }

  render() {
    return (
      <div className="container">
        <ChoosePlayer onChoice={(playerChoice) => this.setPlayer(playerChoice)} />
        <GameOver
          showGameOverModal={this.state.showGameOverModal}
          winner={this.state.winner}
        />
        <TTTBoard
          currentPlayer={this.state.currentPlayer}
          gameOver={(winner) => this.gameOver(winner)}
          toggleTurn={this.toggleTurn} />
      </div>
    );
  }
}

export default App;
