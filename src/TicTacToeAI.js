import update from 'immutability-helper';
import TTTBoard from './TTTBoard';

export class TicTacToeAI {
  static AIMove(computerPlayer, board) {
    const humanPlayer = (computerPlayer === 'X') ? 'O' : 'X';
    // check all moves in empty squares
    const emptySquares = TTTBoard.getEmptySquares(board);
    for (let emptySquare of emptySquares) {
      const row = emptySquare[0],
            col = emptySquare[1];

      // if AI wins on move to an empty square, take square
      board = update(board, {[row]: {$splice: [[col, 1, computerPlayer]]}});

      if (TTTBoard.checkWinner(row, col, board, computerPlayer)) {
        return [row, col];
      } else {
        board = update(board, {[row]: {$splice: [[col, 1, '']]}});
      }
    }

    for (let emptySquare of emptySquares) {
      const row = emptySquare[0],
            col = emptySquare[1];

      // if human wins on move to an empty square, take square
      board = update(board, {[row]: {$splice: [[col, 1, humanPlayer]]}});

      if (TTTBoard.checkWinner(row, col, board, humanPlayer)) {
        return [row, col];
      } else {
        board = update(board, {[row]: {$splice: [[col, 1, '']]}});
      }
    }

    // if no next move can win for either, use Monte Carlo simulation to find best move
    return TicTacToeAI.getBestMove(board, computerPlayer);
  }

  static getBestMove(board, player) {
    const playerToScore = player;
    const NUM_TRIALS = 500,
          WIN_WEIGHT = 1,
          LOSS_WEIGHT = -1,
          SCORECARD = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
          ];

    for (let i = 0; i < NUM_TRIALS; ++i) {
      let boardCopy = board.slice();
      // randomly choose a square then randomly play a board
      for (let j = 0; j < 9; ++j) {
        const emptySquares = TTTBoard.getEmptySquares(boardCopy);
        if (emptySquares.length > 0) {
          const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)],
                randomRow = randomEmptySquare[0],
                randomCol = randomEmptySquare[1],
                playerToCheck = player;
          boardCopy = update(boardCopy, {[randomRow]: {$splice: [[randomCol, 1, playerToCheck]]}});
          player = (player === 'X') ? 'O' : 'X';
          // if there's a winner, score the board
          if (TTTBoard.checkWinner(randomRow, randomCol, boardCopy, playerToCheck)) {
            // if playerToScore won, add value to their moves. If they lost, detract value from their moves
            const scoreDiff = (playerToCheck === playerToScore) ? WIN_WEIGHT : LOSS_WEIGHT;
            for (let i = 0; i < SCORECARD.length; ++i) {
              for (let j = 0; j < SCORECARD[i].length; ++j) {
                if (boardCopy[i][j] === playerToScore) {
                  SCORECARD[i][j] += scoreDiff;
                }
              }
            }
            break;
          }
        } else {
          break;
        }
      }
    }
    // return the indices of empty square with highest value (as per scorecard)
    const emptySquares = TTTBoard.getEmptySquares(board);
    let maxScore = Number.NEGATIVE_INFINITY;
    let bestMove = null;
    for (let emptySquare of emptySquares) {
      const emptyRow = emptySquare[0],
            emptyCol = emptySquare[1],
            score = SCORECARD[emptyRow][emptyCol];
      if (score > maxScore) {
        maxScore = score;
        bestMove = [emptyRow, emptyCol];
      }
    }
    return bestMove;
  }
}
