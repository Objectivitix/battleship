// Functions to reflect game states in the DOM.
import { getGridCell } from "./grid";

export function displayFleet(player) {
  const grid = document.querySelector(`.grid--${player.one ? "one" : "two"}`);

  player.waters.occupied.forEach((coords) => {
    getGridCell(grid, coords).classList.add("grid__cell--placed");
  });
}

export function updateCell(one, coords, hit) {
  const grid = document.querySelector(`.grid--${one ? "two" : "one"}`);
  const cell = getGridCell(grid, coords);

  cell.classList.add(hit ? "grid__cell--hit" : "grid__cell--attacked");
}
