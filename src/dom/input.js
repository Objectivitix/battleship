// Functions to obtain human input.
import { containsEqual } from "../lib/equality";

import { getEnemyGrid } from "./grid";
import Setup from "./setup";

export async function arrangeHumanFleet(player) {
  const setup = new Setup(player);

  await setup.setShips();
}

export async function getHumanMove(one, possibleMoves) {
  const grid = getEnemyGrid(one);

  return new Promise((resolve) => {
    grid.addEventListener("click", function awaitValidMove(evt) {
      if (!evt.target.classList.contains("grid__cell")) {
        return;
      }

      const coords = JSON.parse(evt.target.dataset.coords);

      if (!containsEqual(possibleMoves, coords)) {
        return;
      }

      grid.removeEventListener("click", awaitValidMove);
      resolve(coords);
    });
  });
}
