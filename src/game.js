/* eslint no-await-in-loop: 0 */

import Board from "./core/Board";
import Bot from "./core/Bot";
import Player from "./core/Player";
import getHumanMove from "./dom/humanMove";

async function getNextMove(player) {
  if (player instanceof Bot) {
    return player.makeNextMove();
  }

  return getHumanMove(player);
}

export default async function game() {
  const boardOne = new Board();
  const boardTwo = new Board();

  const playerOne = new Bot("1", boardOne, boardTwo);
  const playerTwo = new Bot("2", boardTwo, boardOne);

  // playerOne.placeNewShip(5, [0, 0], false);
  // playerOne.placeNewShip(4, [1, 0], false);
  // playerOne.placeNewShip(3, [2, 0], false);
  // playerOne.placeNewShip(3, [3, 0], false);
  // playerOne.placeNewShip(2, [4, 0], false);

  playerOne.arrangeFleet([5, 4, 3, 3, 2]);
  playerTwo.arrangeFleet([5, 4, 3, 3, 2]);

  let playerOneActive = true;

  while (true) {
    const activePlayer = playerOneActive ? playerOne : playerTwo;

    const coords = await getNextMove(activePlayer);
    const hit = activePlayer.attack(coords);

    if (hit && activePlayer.enemyWaters.allSunk) {
      return activePlayer;
    }

    playerOneActive = !playerOneActive;
  }
}
