/* eslint no-await-in-loop: 0 */
import getHumanMove from "./dom/humanMove";
import initDocument from "./dom/initialize";
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

export default async function game() {
  initDocument();

  const boardOne = new Board();
  const boardTwo = new Board();

  const playerOne = new Player(boardOne, boardTwo, true);
  const playerTwo = new Bot(boardTwo, boardOne, false);

  playerOne.placeNewShip(5, [0, 0], false);
  playerOne.placeNewShip(4, [1, 0], false);
  playerOne.placeNewShip(3, [2, 0], false);
  playerOne.placeNewShip(3, [3, 0], false);
  playerOne.placeNewShip(2, [4, 0], false);

  playerTwo.arrangeFleet([5, 4, 3, 3, 2]);

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
