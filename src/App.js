import React, { Component } from 'react';
import ChoosePlayer from './ChoosePlayer';
import TTTBoard from './TTTBoard';

class App extends Component {
  constructor() {
    super();

    this.setPlayer = this.setPlayer.bind(this);
    this.state = { currentPlayer : '' };
  }

  setPlayer(playerChoice) {
    this.setState({ currentPlayer: playerChoice });
  }

  render() {
    return (
      <div>
        <ChoosePlayer onChoice={(playerChoice) => this.setPlayer(playerChoice)} />
        <TTTBoard currentPlayer={this.state.currentPlayer} />
      </div>
    );
  }
}

export default App;
