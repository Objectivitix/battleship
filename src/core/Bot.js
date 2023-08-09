import _ from "lodash";

import Player from "./Player";

export default class Bot extends Player {
  makeNextMove() {
    return _.sample(this.enemyWaters.pending);
  }
}
