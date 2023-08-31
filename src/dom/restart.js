const gridOne = document.querySelector(".grid--one");
const gridTwo = document.querySelector(".grid--two");

const winnerSpan = document.querySelector(".end__winner");
const restartSpan = document.querySelector(".end__restart");

function clearGrid(grid) {
  const cells = grid.querySelectorAll(".grid__cell");

  cells.forEach((cell) => {
    cell.classList.remove(
      "grid__cell--placed",
      "grid__cell--attacked",
      "grid__cell--hit",
    );
  });
}

function clearGrids() {
  clearGrid(gridOne);
  clearGrid(gridTwo);
  clearGrid(document.querySelector(".arrange__grid"));
}

function clearEnd() {
  winnerSpan.textContent = "";
  restartSpan.textContent = "";
}

export default async function restart() {
  restartSpan.textContent = "Play again?";

  return new Promise((resolve) => {
    restartSpan.addEventListener(
      "click",
      () => {
        clearGrids();
        clearEnd();
        resolve();
      },
      { once: true },
    );
  });
}
