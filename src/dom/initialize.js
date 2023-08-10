const grid = document.querySelector(".grid");

function populateGrid() {
  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      const cell = document.createElement("div");
      cell.classList.add("grid__cell");
      cell.dataset.coords = JSON.stringify([y, x]);

      grid.appendChild(cell);
    }
  }
}

export default function initDocument() {
  populateGrid();
}
