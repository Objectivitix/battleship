import { SHIPS } from "./constants";

import { getGridCell } from "./dom/grid";
import { arrangeHumanFleet, getHumanMove } from "./dom/input";
import { updateCell } from "./dom/states";

import Board from "./core/Board";
import Bot from "./core/Bot";
import Player from "./core/Player";

async function getNextMove(player) {
  if (player instanceof Bot) {
    return player.makeNextMove();
  }

  return getHumanMove(player.one, player.enemyWaters.pending);
}

async function arrangeFleet(player) {
  if (player instanceof Bot) {
    player.setShipsRandom(SHIPS.map((shipInfo) => shipInfo.length));
    return;
  }

  // player.setShip(5, [0, 0], false);
  await arrangeHumanFleet(player);
}

export default async function game() {
  const boardOne = new Board();
  const boardTwo = new Board();

  const playerOne = new Player(boardOne, boardTwo, true);
  const playerTwo = new Bot(boardTwo, boardOne, false);

  await arrangeFleet(playerOne);
  await arrangeFleet(playerTwo);

  for (const coordsArr of playerOne.waters.locations.keys()) {
    coordsArr.forEach((coords) => {
      getGridCell(document.querySelector(".grid--one"), coords)?.classList.add(
        "grid__cell--placed",
      );
    });
  }

  let playerOneActive = true;

  while (true) {
    const activePlayer = playerOneActive ? playerOne : playerTwo;

    const coords = await getNextMove(activePlayer);
    const hit = activePlayer.attack(coords);

    updateCell(activePlayer.one, coords, hit);

    if (hit && activePlayer.enemyWaters.allSunk) {
      return activePlayer;
    }

    playerOneActive = !playerOneActive;
  }
}
