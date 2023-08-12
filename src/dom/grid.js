// Utilities for manipulating grids.

// eslint-disable-next-line import/prefer-default-export
export function getGridCell(grid, coords) {
  const coordsString = JSON.stringify(coords);
  const selector = `.grid__cell[data-coords="${coordsString}`;

  return grid.querySelector(selector);
}
