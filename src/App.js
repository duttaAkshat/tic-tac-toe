import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const EMPTY = "_";

function App() {
  const [grid, setGrid] = useState([
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ]);
  const [turn, setTurn] = useState("O"); // O always starts
  const [singlePlayer, setSinglePlayer] = useState(null);
  const [message, setMessage] = useState("");

  // ----- GAME LOGIC -----
  const checkWinner = (board) => {
    // rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== EMPTY && board[i][0] === board[i][1] && board[i][1] === board[i][2])
        return board[i][0];
    }
    // columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] !== EMPTY && board[0][i] === board[1][i] && board[1][i] === board[2][i])
        return board[0][i];
    }
    // diagonals
    if (board[0][0] !== EMPTY && board[0][0] === board[1][1] && board[1][1] === board[2][2])
      return board[0][0];
    if (board[0][2] !== EMPTY && board[0][2] === board[1][1] && board[1][1] === board[2][0])
      return board[0][2];
    return null;
  };

  const isMovesLeft = (board) => board.flat().some((c) => c === EMPTY);

  const minimax = (board, depth, isMax) => {
    const winner = checkWinner(board);
    if (winner === "X") return 10 - depth;
    if (winner === "O") return depth - 10;
    if (!isMovesLeft(board)) return 0;

    if (isMax) {
      let best = -1000;
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          if (board[i][j] === EMPTY) {
            board[i][j] = "X";
            best = Math.max(best, minimax(board, depth + 1, false));
            board[i][j] = EMPTY;
          }
      return best;
    } else {
      let best = 1000;
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          if (board[i][j] === EMPTY) {
            board[i][j] = "O";
            best = Math.min(best, minimax(board, depth + 1, true));
            board[i][j] = EMPTY;
          }
      return best;
    }
  };

  const findBestMove = (board) => {
    let bestVal = -1000;
    let move = [-1, -1];
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[i][j] === EMPTY) {
          board[i][j] = "X";
          let val = minimax(board, 0, false);
          board[i][j] = EMPTY;
          if (val > bestVal) {
            bestVal = val;
            move = [i, j];
          }
        }
    return move;
  };

  // ----- HANDLE CLICK -----
  const handleClick = (i, j) => {
    if (grid[i][j] !== EMPTY || message) return; // ignore if filled or game over

    let newGrid = grid.map((row) => row.slice());
    newGrid[i][j] = turn;
    setGrid(newGrid);

    let winner = checkWinner(newGrid);
    if (winner) {
      setMessage(`${winner === "O" ? "Player A" : singlePlayer ? "Computer" : "Player B"} won!`);
      return;
    } else if (!isMovesLeft(newGrid)) {
      setMessage("Yarr maja nahi aaya! Draw ho gaya bc");
      return;
    }

    // switch turn
    const nextTurn = turn === "O" ? "X" : "O";
    setTurn(nextTurn);

    // single-player AI move
    if (singlePlayer && nextTurn === "X") {
      const [aiI, aiJ] = findBestMove(newGrid);
      newGrid[aiI][aiJ] = "X";
      setTimeout(() => {
        setGrid(newGrid);
        const winner2 = checkWinner(newGrid);
        if (winner2) {
          setMessage("Chutiya hai kya?? Computer se haar gaya!!");
        } else if (!isMovesLeft(newGrid)) {
          setMessage("Yarr maja nahi aaya! Draw ho gaya bc");
        }
        setTurn("O");
      }, 200); // slight delay for realism
    }
  };

  const resetGame = () => {
    setGrid([
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ]);
    setTurn("O");
    setMessage("");
    setSinglePlayer(null);
  };

  if (singlePlayer === null) {
    return (
      <div className="container">
        <h1>Tic-Tac-Toe</h1>
        <button onClick={() => setSinglePlayer(true)}>Single Player</button>
        <button onClick={() => setSinglePlayer(false)}>Multiplayer</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <button key={`${i}-${j}`} className="cell" onClick={() => handleClick(i, j)}>
              {cell !== EMPTY ? cell : ""}
            </button>
          ))
        )}
      </div>
      {message && <h2>{message}</h2>}
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

export default App;