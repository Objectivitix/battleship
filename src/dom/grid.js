// Utilities for manipulating grids.

export function getOwnGrid(one) {
  return document.querySelector(`.grid--${one ? "one" : "two"}`);
}

export function getEnemyGrid(one) {
  return document.querySelector(`.grid--${one ? "two" : "one"}`);
}

export function getGridCell(grid, coords) {
  const coordsString = JSON.stringify(coords);
  const selector = `.grid__cell[data-coords="${coordsString}"]`;

  return grid.querySelector(selector);
}
