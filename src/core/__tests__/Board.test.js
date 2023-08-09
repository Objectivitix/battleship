import Board from "../Board";
import Ship from "../Ship";

jest.mock("../Ship");

describe("Board", () => {
  let board;

  let ship1;
  let ship2;

  beforeEach(() => {
    board = new Board();

    Ship.mockClear();

    ship1 = new Ship(2);
    ship2 = new Ship(3);

    board.placeShip(ship1, [
      [0, 0],
      [0, 1],
    ]);
    board.placeShip(ship2, [
      [1, 0],
      [1, 1],
      [1, 2],
    ]);
  });

  it("records received attacks", () => {
    board.receiveAttack([4, 0]);
    board.receiveAttack([4, 1]);
    board.receiveAttack([4, 2]);
    expect(board.attacked).toEqual([
      [4, 0],
      [4, 1],
      [4, 2],
    ]);
  });

  it("populates ships array", () => {
    expect(board.ships).toEqual([ship1, ship2]);
  });

  it("maps coords to ships", () => {
    expect(board.locations).toEqual(
      new Map([
        [
          [
            [0, 0],
            [0, 1],
          ],
          ship1,
        ],
        [
          [
            [1, 0],
            [1, 1],
            [1, 2],
          ],
          ship2,
        ],
      ]),
    );
  });

  it("records occupied coords", () => {
    expect(board.occupied).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [1, 2],
    ]);
  });

  it("checks if coords are available", () => {
    expect(board.isAvailable([0, 0])).toBe(false);
    expect(board.isAvailable([1, 3])).toBe(true);
  });

  it("calls receiveHit of ship if shot", () => {
    board.receiveAttack([1, 1]);
    board.receiveAttack([1, 2]);
    expect(ship2.receiveHit).toHaveBeenCalledTimes(2);
  });
});
