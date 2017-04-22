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
      humanPlayer: null,
      computerPlayer: null,
      score: {'X': 0, 'O': 0},
      showGameOverModal: false
    };
  }

  setPlayer(playerChoice) {
    const computerPlayer = (playerChoice === this.CIRCLE) ? this.EX : this.CIRCLE;
    this.setState({
      currentPlayer: playerChoice,
      humanPlayer: playerChoice,
      computerPlayer: computerPlayer
    });
  }

  gameOver(winner) {
    this.setState(prevState => {
      prevState.score[winner] += 1;
      prevState.showGameOverModal = true;
      return prevState;
    });
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
          humanScore={this.state.score[this.state.humanPlayer]}
          computerScore={this.state.score[this.state.computerPlayer]} />
        <TTTBoard
          currentPlayer={this.state.currentPlayer}
          gameOver={(winner) => this.gameOver(winner)}
          toggleTurn={this.toggleTurn} />
      </div>
    );
  }
}

export default App;
