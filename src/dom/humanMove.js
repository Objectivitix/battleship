import { containsEqual } from "../lib/equality";

let cells;
let initalized = false;

export default async function getHumanMove(possibleMoves) {
  if (!initalized) {
    cells = document.querySelectorAll(".grid__cell");
    initalized = true;
  }

  return new Promise((resolve) => {
    cells.forEach((cell) => {
      const coords = JSON.parse(cell.dataset.coords);

      if (!containsEqual(possibleMoves, coords)) {
        return;
      }

      cell.addEventListener("click", () => resolve(coords), { once: true });
    });
  });
}
