# Tic-Tac-Toe
This is a tic-tac-toe game written in React with JSX.  It features a computer player that cannot be beaten (only tied).
You can play the game [here](https://aryanj-nyc.github.io/react-tic-tac-toe).

## Artificial Intelligence
The computer is equipped with an artificial intelligence created to maximize its chance at winning the game.  As such, 
the computer cannot be beaten.  At best, a human can tie.  The artificial intelligence code is located in
[TicTacToe.js](https://github.com/AryanJ-NYC/react-tic-tac-toe/blob/master/src/TicTacToeAI.js).  It works as follows:

1. The script will iterate over empty squares.  If it could win immediately, it will take that square.  Else:
2. The Script will iterate over empty squares.  If it could block a human opponent's win, it will take that square.  Else:
3. The script will run `NUM_TRIALS` (currently set at 500) trial simulated games.  It will randomly choose an empty square to
move to, simulate an opponent's move and so forth until there is a winner.  The computer's moves will be scored appropriately
depending on a win or a loss according to `WIN_WEIGHT` and `LOSS_WEIGHT`, respectively.  Both are initially set to +1
and -1, respectively.  The computer will subsequently move to the empty square with the maximum score.
