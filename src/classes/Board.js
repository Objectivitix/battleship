import _ from "lodash";

export default class Board {
  constructor() {
    this.ships = [];
    this.locations = new Map();
    this.attacked = [];
  }

  get allSunk() {
    return this.ships.every((ship) => ship.sunk);
  }

  placeShip(ship, coordsArr) {
    this.ships.push(ship);
    this.locations.set(coordsArr, ship);
  }

  receiveAttack(target) {
    this.attacked.push(target);

    this.locations.forEach((ship, coordsArr) => {
      if (coordsArr.some((coords) => _.isEqual(coords, target))) {
        ship.receiveHit();
      }
    });
  }
}
