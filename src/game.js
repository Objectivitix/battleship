import { SHIPS } from "./constants";

import { arrangeHumanFleet, getHumanMove } from "./dom/input";
import { displayFleet, displayWinner, updateCell } from "./dom/states";

import Board from "./core/Board";
import Bot from "./core/Bot";
import Player from "./core/Player";
import restart from "./dom/restart";

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

  await arrangeHumanFleet(player);
}

export async function playRound() {
  const boardOne = new Board();
  const boardTwo = new Board();

  const playerOne = new Player(boardOne, boardTwo, true);
  const playerTwo = new Bot(boardTwo, boardOne, false);

  await arrangeFleet(playerOne);
  await arrangeFleet(playerTwo);

  displayFleet(playerOne);

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

export default async function game() {
  while (true) {
    const winner = await playRound();

    displayWinner(winner);
  
    await restart();
  }
}
