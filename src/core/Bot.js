import _ from "lodash";

import { BOARD_SL } from "../constants";

import Player from "./Player";

export default class Bot extends Player {
  setShipsRandom(lengths) {
    lengths.forEach((length) => {
      const vertical = Boolean(_.random());

      const available = [];

      for (let y = 0; y < BOARD_SL; y += 1) {
        for (let x = 0; x < BOARD_SL; x += 1) {
          const coordsArr = Player.calcCoordsArr(length, [y, x], vertical);

          if (this.waters.isValid(coordsArr)) {
            available.push([y, x]);
          }
        }
      }

      this.setShip(length, _.sample(available), vertical);
    });
  }

  makeNextMove() {
    return _.sample(this.enemyWaters.pending);
  }
}
