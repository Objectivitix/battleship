import _ from "lodash";

import Player from "./Player";
import containsEqual from "../lib/containsEqual";

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
      } while (!this.waters.isAvailable(coordsArr));

      available = available.filter(
        (coords) => !containsEqual(coordsArr, coords),
      );

      this.placeNewShip(length, start, vertical);
    });
  }

  makeNextMove() {
    return _.sample(this.enemyWaters.pending);
  }
}
