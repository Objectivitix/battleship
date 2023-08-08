export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  receiveHit() {
    this.hits += 1;
  }

  get sunk() {
    return this.hits === this.length;
  }
}
