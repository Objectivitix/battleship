/* eslint no-await-in-loop: 0 */
import initDocument from "./dom/initialize";
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
    player.setShipsRandom([5, 4, 3, 3, 2]);
    return;
  }

  arrangeHumanFleet(player);
}

export default async function game() {
  initDocument();

  const boardOne = new Board();
  const boardTwo = new Board();

  const playerOne = new Player(boardOne, boardTwo, true);
  const playerTwo = new Bot(boardTwo, boardOne, false);

  await arrangeFleet(playerOne);
  await arrangeFleet(playerTwo);

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
