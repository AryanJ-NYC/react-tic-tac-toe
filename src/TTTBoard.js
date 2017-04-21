import React, { Component } from 'react';
import BoardSquare from './BoardSquare';

class TTTBoard extends Component {
  constructor(props) {
    super(props);

    const NUM_ROWS = 3;
    const NUM_COLS = 3;
    let gameboard = [];

    // gameboard initialization
    for (let i = 0; i < NUM_ROWS; ++i) {
      gameboard.push([]);
      for (let j = 0; j < NUM_COLS; ++j) {
        gameboard[i].push('');
      }
    }

    this.writeToBoard = this.writeToBoard.bind(this);
    this.state = { gameboard: gameboard };
  }

  writeToBoard(rowIndex, colIndex) {
    console.log(rowIndex, colIndex);
  }

  render() {
    let renderedBoard = this.state.gameboard.map((boardRow, rowIndex) => {
      return (
        <div className="row" key={`row-${rowIndex}`}>
          {boardRow.map((boardSquare, colIndex) => {
            return (
              <div className="col-xs-3" key={`col-${colIndex}`}>
                <BoardSquare
                  onClick={() => this.writeToBoard(rowIndex, colIndex)}
                  value={boardSquare}
                  row={rowIndex}
                  col={colIndex} />
              </div>
            )
          })}
        </div>
      )
    });

    return (
      <div className="container">
        {renderedBoard}
      </div>
    );
  }
}

export default TTTBoard;
