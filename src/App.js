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
    this.newGame = this.newGame.bind(this);
    this.startNewGame = this.startNewGame.bind(this);

    this.state = {
      humanPlayer: null,
      computerPlayer: null,
      score: {'X': 0, 'O': 0},
      showGameOverModal: false,
      triggerNewGame: false
    };
  }

  setPlayer(playerChoice) {
    const computerPlayer = (playerChoice === this.CIRCLE) ? this.EX : this.CIRCLE;
    this.setState({
      humanPlayer: playerChoice,
      computerPlayer: computerPlayer,
    });
  }

  /**
   * @param winner - winner of the last game
   * Displays game over modal
   */
  gameOver(winner) {
    const score = this.state.score;
    // if it's not a draw, increase score
    if (winner !== 'D') {
      score[winner] += 1;
    }

    this.setState({ showGameOverModal: true, winner: winner, score: score });
  }

  toggleTurn() {
    const currentPlayer = (this.state.currentPlayer === this.CIRCLE) ? this.EX : this.CIRCLE;
    this.setState({ currentPlayer: currentPlayer });
  }

  /**
   * Triggers a new game. triggerNewGame is a boolean passed as a property to TTTBoard. When true, TTTBoard will reset.
   * This method is passed as property to and called by the GameOver modal.
   */
  newGame() {
    this.setState({ triggerNewGame: true });
  }

  /**
   * Clears the gameOver modal. Passed as property to and called by TTTBoard.
   */
  startNewGame() {
    this.setState({
      triggerNewGame: false,
      showGameOverModal: false
    });
  }

  render() {
    return (
      <div className="container">
        <ChoosePlayer onChoice={(playerChoice) => this.setPlayer(playerChoice)} />
        <GameOver
          showGameOverModal={this.state.showGameOverModal}
          winner={this.state.winner}
          newGame={this.newGame}
          score={this.state.score} />
        {this.state.humanPlayer &&
        <TTTBoard
          humanPlayer={this.state.humanPlayer}
          computerPlayer={this.state.computerPlayer}
          gameOver={(winner) => this.gameOver(winner)}
          toggleTurn={this.toggleTurn}
          newGame={this.state.triggerNewGame}
          startNewGame={this.startNewGame} />}
      </div>
    );
  }
}

export default App;
