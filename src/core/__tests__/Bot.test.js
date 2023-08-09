import Board from "../Board";
import Bot from "../Bot";

jest.mock("../Board");

describe("Bot", () => {
  let bot;

  beforeEach(() => {
    Board.mockClear();

    bot = new Bot(undefined, new Board(), {
      pending: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    });
  });

  it("makes a random valid move", () => {
    const move = bot.makeNextMove();
    expect(bot.enemyWaters.pending).toContainEqual(move);
  });

  it("arranges fleet randomly", () => {
    bot.waters.isAvailable.mockReturnValue(true);

    bot.arrangeFleet([5, 4, 3, 3, 2]);

    expect(bot.waters.placeShip).toHaveBeenCalledTimes(5);
    expect(bot.waters.placeShip).toHaveBeenCalledWith(
      expect.objectContaining({ length: expect.any(Number) }),
      expect.arrayContaining([[expect.any(Number), expect.any(Number)]]),
    );

    expect(bot.waters.isAvailable).toHaveBeenCalled();
  });
});
