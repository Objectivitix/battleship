import Ship from "../Ship";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  it("gets hit twice", () => {
    ship.receiveHit();
    expect(ship.hits).toBe(1);
    ship.receiveHit();
    expect(ship.hits).toBe(2);
  });

  it("is not sunk", () => {
    ship.receiveHit();
    expect(ship.sunk).toBe(false);
  });

  it("is sunk", () => {
    ship.receiveHit();
    ship.receiveHit();
    ship.receiveHit();
    expect(ship.sunk).toBe(true);
  });
});
