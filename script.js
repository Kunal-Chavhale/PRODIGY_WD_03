const cells = document.querySelectorAll(".cell");
      const statusText = document.getElementById("status");
      const resetButton = document.getElementById("resetButton");
      let currentPlayer = "X";
      let board = ["", "", "", "", "", "", "", "", ""];
      let isGameActive = true;

      const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      function handleCellClick(event) {
        const index = event.target.getAttribute("data-index");

        if (board[index] !== "" || !isGameActive) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }

      function checkWinner() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
          const [a, b, c] = winningConditions[i];
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
          }
        }

        if (roundWon) {
          statusText.textContent = `Player ${currentPlayer} wins!`;
          isGameActive = false;
        } else if (!board.includes("")) {
          statusText.textContent = `It's a draw!`;
          isGameActive = false;
        }
      }

      function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        isGameActive = true;
        statusText.textContent = "";
        cells.forEach((cell) => (cell.textContent = ""));
      }

      cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
      resetButton.addEventListener("click", resetGame);
