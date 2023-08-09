import isEqual from "../lib/isEqual";
import isNotEqual from "../lib/isNotEqual";

export default class Board {
  constructor() {
    this.ships = [];
    this.locations = new Map();

    this.pending = [];

    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 10; x += 1) {
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

  isAvailable(target) {
    return !this.occupied.some(isEqual(target));
  }

  isAvailableArr(targets) {
    return targets.every((target) => this.isAvailable(target));
  }

  placeShip(ship, coordsArr) {
    this.ships.push(ship);
    this.locations.set(coordsArr, ship);
  }

  receiveAttack(target) {
    let hit = false;
    this.pending = this.pending.filter(isNotEqual(target));

    this.locations.forEach((ship, coordsArr) => {
      if (coordsArr.some(isEqual(target))) {
        hit = true;
        ship.receiveHit();
      }
    });

    return hit;
  }
}
