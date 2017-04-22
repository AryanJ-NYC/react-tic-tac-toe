import React, { Component } from 'react';
import update from 'immutability-helper';
import BoardSquare from './BoardSquare';
import { TicTacToeAI } from './TicTacToeAI';

class TTTBoard extends Component {
  constructor(props) {
    super(props);

    const NUM_ROWS = 3;
    const NUM_COLS = 3;
    this.CIRCLE = 'O';
    this.EX = 'X';

    let gameboard = [];
    // gameboard initialization
    for (let i = 0; i < NUM_ROWS; ++i) {
      gameboard.push([]);
      for (let j = 0; j < NUM_COLS; ++j) {
        gameboard[i].push('');
      }
    }

    this.writeToBoard = this.writeToBoard.bind(this);
    TTTBoard.checkWinner = TTTBoard.checkWinner.bind(this);
    this.getSquareStyle = this.getSquareStyle.bind(this);

    this.state = {
      gameboard: gameboard,
      currentPlayer: this.props.humanPlayer
    };
  }

  /**
   * @param rowIndex
   * @param colIndex
   * Writes to state's gameboard. Computer goes directly after human moves
   */
  writeToBoard(rowIndex, colIndex) {
    let gameboard = this.state.gameboard.slice();
    if (gameboard[rowIndex][colIndex] === '') {
      gameboard = update(gameboard, {[rowIndex]: {$splice: [[colIndex, 1, this.state.currentPlayer]]}});

      if (TTTBoard.checkWinner(rowIndex, colIndex, gameboard, this.state.currentPlayer)) {
        this.props.gameOver(this.state.currentPlayer);
        return;
      }

      this.setState({ gameboard: gameboard }, () => {
        if (this.boardIsFull()) {
          this.props.gameOver('D');
          return;
        }
      });

      const nextPlayer = (this.state.currentPlayer === this.props.humanPlayer) ? this.props.computerPlayer : this.props.humanPlayer;
      this.setState({ currentPlayer: nextPlayer }, () => {
        // if human went, computer goes
        if (this.state.currentPlayer === this.props.computerPlayer) {
          const AIMove = TicTacToeAI.AIMove(this.props.computerPlayer, gameboard.slice());

          if (AIMove) {
            const rowIndex = AIMove[0],
                colIndex = AIMove[1];
            this.writeToBoard(rowIndex, colIndex);
          }
        }
      });
    }
  }

  /**
   * @param rowIndex
   * @param colIndex
   * @param board
   * @param currentPlayer
   * @return {boolean} - Returns true if move at [rowIndex, colIndex] on board by currentPlayer wins the game. False otherwise
   */
  static checkWinner(rowIndex, colIndex, board, currentPlayer) {
    // check for column win
    for (let i = 0; i < board.length; ++i) {
      if (board[i][colIndex] !== currentPlayer) {
        break;
      }
      // if i gets to end without breaking, we have a winner
      if (i === board.length-1) {
        return true;
      }
    }

    // check for row win
    for (let j = 0; j < board[0].length; ++j) {
      if (board[rowIndex][j] !== currentPlayer) {
        break;
      }
      // if j gets to end without breaking, we have a winner
      if (j === board[0].length-1) {
        return true;
      }
    }

    // check for diagonal wins
    if (rowIndex === colIndex) {
      for (let i = 0; i < board.length; ++i) {
        if (board[i][i] !== currentPlayer) {
          break;
        }
        if (i === board.length-1) {
          return true;
        }
      }
    }

    if (rowIndex + colIndex === board.length-1) {
      for (let i = 0; i < board.length; ++i) {
        if (board[i][board.length-1-i] !== currentPlayer) {
          break;
        }
        if (i === board.length-1) {
          return true;
        }
      }
    }
    return false;
  }

  static getEmptySquares(board) {
    const emptySquares = [];
    for (let i = 0; i < board.length; ++i) {
      for (let j = 0; j < board[i].length; ++j) {
        if (board[i][j] === '') {
          emptySquares.push([i, j]);
        }
      }
    }
    return emptySquares;
  }

  /**
   * @return {boolean} - True if state's gameboard is full. False otherwise.
   */
  boardIsFull() {
    const board = this.state.gameboard;
    for (let boardRow of board) {
      for (let boardSquare of boardRow) {
        if (boardSquare === '') {
          return false;
        }
      }
    }
    return true;
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
                className="col-xs-3 text-center"
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
      <div style={{height: '100vh'}}>
        {renderedBoard}
      </div>
    );
  }
}

export default TTTBoard;
