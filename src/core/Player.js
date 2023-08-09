import Ship from "./Ship";

export default class Player {
  constructor(name, waters, enemyWaters) {
    this.name = name;
    this.waters = waters;
    this.enemyWaters = enemyWaters;
  }

  static calcCoordsArr(length, [startY, startX], vertical) {
    const coordsArr = [];

    for (let i = 0; i < length; i += 1) {
      coordsArr.push(vertical ? [startY + i, startX] : [startY, startX + i]);
    }

    return coordsArr;
  }

  attack(validCoords) {
    return this.enemyWaters.receiveAttack(validCoords);
  }

  placeNewShip(length, [startY, startX], vertical) {
    const ship = new Ship(length);
    const coordsArr = Player.calcCoordsArr(length, [startY, startX], vertical);

    this.waters.placeShip(ship, coordsArr);
  }
}
