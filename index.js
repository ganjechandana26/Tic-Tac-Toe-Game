const board = document.getElementById('board');
const status = document.getElementById('status');
let cells = Array.from(document.querySelectorAll('.cell'));
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = Array(9).fill('');

    function checkWinner() {
      const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diags
      ];
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
          gameState[a] &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        ) {
          return gameState[a];
        }
      }
      return gameState.includes('') ? null : 'Draw';
    }

    function handleCellClick(e) {
      const idx = e.target.getAttribute('data-index');
      if (!gameActive || gameState[idx]) return;
      gameState[idx] = currentPlayer;
      e.target.textContent = currentPlayer;
      e.target.classList.add('taken');
      const winner = checkWinner();
      if (winner) {
        gameActive = false;
        status.textContent = winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
    }

    function resetGame() {
      gameState = Array(9).fill('');
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
      });
      currentPlayer = 'X';
      gameActive = true;
      status.textContent = "Player X's turn";
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
