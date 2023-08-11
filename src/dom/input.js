// Functions to obtain human input.
import { containsEqual } from "../lib/equality";

const arrangeModal = document.querySelector(".arrange");
const arrangeHeading = document.querySelector(".arrange__heading");
const arrangeRotate = document.querySelector(".arrange__rotate");
const arrangeGrid = document.querySelector(".arrange__grid");

export async function arrangeHumanFleet(player) {
  arrangeHeading.textContent = `Player ${
    player.one ? "1" : "2"
  }, place your Carrier!`;

  arrangeModal.showModal();

  return new Promise((resolve) => {
    arrangeRotate.addEventListener("click", () => {
      player.setShip(5, [0, 0], false);
      player.setShip(4, [1, 0], false);
      player.setShip(3, [2, 0], false);
      player.setShip(3, [3, 0], false);
      player.setShip(2, [4, 0], false);
      arrangeModal.close();
      resolve();
    });
  });
}

export async function getHumanMove(one, possibleMoves) {
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
