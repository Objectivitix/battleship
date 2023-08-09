import Ship from "./Ship";

export default class Player {
  constructor(waters, enemyWaters) {
    this.waters = waters;
    this.enemyWaters = enemyWaters;
  }

  attack(validCoords) {
    this.enemyWaters.receiveAttack(validCoords);
  }

  placeNewShip(length, [startY, startX], vertical) {
    const ship = new Ship(length);

    const coordsArr = [];

    for (let i = 0; i < length; i += 1) {
      coordsArr.push(vertical ? [startY + i, startX] : [startY, startX + i]);
    }

    this.waters.placeShip(ship, coordsArr);
  }
}
