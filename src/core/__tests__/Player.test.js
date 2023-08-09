import Board from "../Board";
import Player from "../Player";

jest.mock("../Board");

describe("Player", () => {
  let player;

  beforeEach(() => {
    Board.mockClear();

    player = new Player(undefined, new Board(), new Board());
  });

  it("attacks enemy waters", () => {
    player.attack([0, 0]);
    expect(player.enemyWaters.receiveAttack).toHaveBeenCalled();
  });

  it("places ship on own board horizontally", () => {
    player.placeNewShip(3, [0, 0], false);
    expect(player.waters.placeShip).toHaveBeenCalledWith(
      expect.objectContaining({ length: 3 }),
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    );
  });

  it("places ship on own board vertically", () => {
    player.placeNewShip(3, [0, 0], true);
    expect(player.waters.placeShip).toHaveBeenCalledWith(
      expect.objectContaining({ length: 3 }),
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
    );
  });
});
