import _ from "lodash";

import { removeMultiple } from "../lib/equality";

import Player from "./Player";

export default class Bot extends Player {
  setShipsRandom(lengths) {
    let available = [];

    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 10; x += 1) {
        available.push([y, x]);
      }
    }

    lengths.forEach((length) => {
      const vertical = Boolean(_.random());

      let start;
      let coordsArr;

      do {
        start = _.sample(available);
        coordsArr = Player.calcCoordsArr(length, start, vertical);
      } while (!this.waters.isValid(coordsArr));

      available = removeMultiple(available, coordsArr);

      this.setShip(length, start, vertical);
    });
  }

  makeNextMove() {
    return _.sample(this.enemyWaters.pending);
  }
}
