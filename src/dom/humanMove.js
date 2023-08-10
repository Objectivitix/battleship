import { containsEqual } from "../lib/equality";

export default async function getHumanMove(one, possibleMoves) {
  const cells = document.querySelectorAll(
    `.grid--${one ? "two" : "one"} > .grid__cell`,
  );

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
