import Ship from "../Ship";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  it("gets hit twice", () => {
    ship.receiveHit();
    ship.receiveHit();
    expect(ship.hits).toBe(2);
  });

  it("does not get sunk", () => {
    ship.receiveHit();
    expect(ship.sunk).toBe(false);
  });

  it("gets sunk", () => {
    ship.receiveHit();
    ship.receiveHit();
    ship.receiveHit();
    expect(ship.sunk).toBe(true);
  });
});
