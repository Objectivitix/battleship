import _ from "lodash";

function isEqual(target) {
  return (element) => _.isEqual(element, target);
}

export default class Board {
  constructor() {
    this.ships = [];
    this.locations = new Map();
    this.attacked = [];
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

  placeShip(ship, coordsArr) {
    this.ships.push(ship);
    this.locations.set(coordsArr, ship);
  }

  receiveAttack(target) {
    this.attacked.push(target);

    this.locations.forEach((ship, coordsArr) => {
      if (coordsArr.some(isEqual(target))) {
        ship.receiveHit();
      }
    });
  }
}
