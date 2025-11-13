import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    const win = checkWinner(newBoard);
    if (win) setWinner(win);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">React Tic Tac Toe</h1>

      {/* Board */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 bg-gray-800 rounded-lg text-4xl font-bold hover:bg-gray-700 transition"
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Status */}
      <div className="mb-4 text-lg">
        {winner
          ? `Winner: ${winner}`
          : board.every((cell) => cell)
          ? "It's a Draw!"
          : `Next Turn: ${isXTurn ? "X" : "O"}`}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;
