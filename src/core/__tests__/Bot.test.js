import Bot from "../Bot";

describe("Bot", () => {
  let bot;

  beforeEach(() => {
    bot = new Bot(undefined, undefined, {
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
});
