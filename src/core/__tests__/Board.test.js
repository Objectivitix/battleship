import Board from "../Board";
import Ship from "../Ship";

jest.mock("../Ship");

let board;

let ship1;
let ship2;

beforeEach(() => {
  Ship.mockClear();

  board = new Board();

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

describe("ships: Board", () => {
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

  it("checks if coords are free for new ship", () => {
    expect(
      board.isAvailable([
        [0, 0],
        [0, 1],
        [0, 2],
      ]),
    ).toBe(false);
    expect(
      board.isAvailable([
        [2, 0],
        [2, 1],
        [2, 2],
      ]),
    ).toBe(true);
  });
});

describe("attacks: Board", () => {
  it("deletes received attacks' coords from pending", () => {
    board.receiveAttack([4, 0]);
    expect(board.pending).not.toContainEqual([4, 0]);
  });

  it("returns whether attack was successful", () => {
    expect(board.receiveAttack([1, 1])).toBe(true);
    expect(board.receiveAttack([2, 2])).toBe(false);
  });

  it("calls receiveHit of ship if shot", () => {
    board.receiveAttack([1, 1]);
    board.receiveAttack([1, 2]);
    expect(ship2.receiveHit).toHaveBeenCalledTimes(2);
  });
});
