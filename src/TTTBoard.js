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
    this.getSquareStyle = this.getSquareStyle.bind(this);
    this.state = { gameboard: gameboard };
  }

  writeToBoard(rowIndex, colIndex) {
    console.log(rowIndex, colIndex);
  }

  /**
   * @param {Number} rowIndex - row number of square to be styled
   * @param {Number} colIndex - column number of square to be styled
   * @return {Object} Style to be applied to square
   */
  getSquareStyle(rowIndex, colIndex) {
    const numRows = this.state.gameboard.length,
        numCols = this.state.gameboard[0].length;

    let style = {
      height: '100%'
    };

    const lineStyle = '1px solid black';
    // apply top border if not top row
    if (rowIndex > 0) {
      style.borderTop = lineStyle;
    }

    // apply bottom border if not bottom row
    if (rowIndex < numRows-1) {
      style.borderBottom = lineStyle;
    }

    // apply left border if not left column
    if (colIndex > 0) {
      style.borderLeft = lineStyle;
    }

    // apply right border if not right column
    if (colIndex < numCols-1) {
      style.borderRight = lineStyle;
    }
    return style;
  }

  render() {
    let renderedBoard = this.state.gameboard.map((boardRow, rowIndex) => {
      return (
        <div className="row" key={`row-${rowIndex}`} style={{height: '33.333%'}}>
          {boardRow.map((boardSquare, colIndex) => {
            const squareStyle = this.getSquareStyle(rowIndex, colIndex);
            return (
              <div
                className="col-xs-3"
                key={`col-${colIndex}`}
                style={squareStyle}
                onClick={() => this.writeToBoard(rowIndex, colIndex)} >
                <BoardSquare
                  value={boardSquare}
                  row={rowIndex}
                  col={colIndex}
                  />
              </div>
            )
          })}
        </div>
      )
    });

    return (
      <div style={{height: '100vh', width: '100%'}}>
        {renderedBoard}
      </div>
    );
  }
}

export default TTTBoard;
