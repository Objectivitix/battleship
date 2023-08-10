import _ from "lodash";

import Player from "./Player";
import { removeMultiple } from "../lib/equality";

export default class Bot extends Player {
  arrangeFleet(lengths) {
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

      this.placeNewShip(length, start, vertical);
    });
  }

  makeNextMove() {
    return _.sample(this.enemyWaters.pending);
  }
}
