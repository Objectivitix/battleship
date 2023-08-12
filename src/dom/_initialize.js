import { BOARD_SL } from "../constants";

const arrangeModal = document.querySelector(".arrange");
const grids = document.querySelectorAll(".grid");

function populateGrid(grid) {
  for (let y = 0; y < BOARD_SL; y += 1) {
    for (let x = 0; x < BOARD_SL; x += 1) {
      const cell = document.createElement("div");
      cell.classList.add("grid__cell");
      cell.dataset.coords = JSON.stringify([y, x]);

      grid.appendChild(cell);
    }
  }
}

function populateGrids() {
  grids.forEach(populateGrid);
}

populateGrids();

// Disallow dismissal of arrange fleet input using ESC key
arrangeModal.addEventListener("cancel", (evt) => {
  evt.preventDefault();
});
