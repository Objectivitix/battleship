// Functions to reflect game states in the DOM.
import { getGridCell } from "./grid";

// eslint-disable-next-line import/prefer-default-export
export function updateCell(one, coords, hit) {
  const grid = document.querySelector(`.grid--${one ? "two" : "one"}`);
  const cell = getGridCell(grid, coords);

  cell.classList.add(hit ? "grid__cell--hit" : "grid__cell--attacked");
}
