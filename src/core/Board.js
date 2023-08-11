import { BOARD_SL } from "../constants";

import { containsEqual, remove } from "../lib/equality";

export default class Board {
  constructor() {
    this.ships = [];
    this.locations = new Map();

    this.pending = [];

    for (let y = 0; y < BOARD_SL; y += 1) {
      for (let x = 0; x < BOARD_SL; x += 1) {
        this.pending.push([y, x]);
      }
    }
  }

  get allSunk() {
    return this.ships.every((ship) => ship.sunk);
  }

  get occupied() {
    return Array.from(this.locations.keys()).flat();
  }

  static isInBounds([y, x]) {
    return 0 <= y && y < BOARD_SL && 0 <= x && x < BOARD_SL;
  }

  isValid(targets) {
    return targets.every(
      (target) =>
        Board.isInBounds(target) && !containsEqual(this.occupied, target),
    );
  }

  placeShip(ship, coordsArr) {
    this.ships.push(ship);
    this.locations.set(coordsArr, ship);
  }

  receiveAttack(target) {
    let hit = false;
    this.pending = remove(this.pending, target);

    this.locations.forEach((ship, coordsArr) => {
      if (containsEqual(coordsArr, target)) {
        hit = true;
        ship.receiveHit();
      }
    });

    return hit;
  }
}
