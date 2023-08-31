// Functions to reflect game states in the DOM.
import { getEnemyGrid, getGridCell, getOwnGrid } from "./grid";

const winnerSpan = document.querySelector(".end__winner");

export function displayFleet(player) {
  const grid = getOwnGrid(player.one);

  player.waters.occupied.forEach((coords) => {
    getGridCell(grid, coords).classList.add("grid__cell--placed");
  });
}

export function updateCell(one, coords, hit) {
  const grid = getEnemyGrid(one);
  const cell = getGridCell(grid, coords);

  cell.classList.add(hit ? "grid__cell--hit" : "grid__cell--attacked");
}

export function displayWinner(player) {
  winnerSpan.textContent = `Player ${player.one ? "1" : "2"} wins!`;
}
