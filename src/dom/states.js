// Functions to reflect game states in the DOM.

// eslint-disable-next-line import/prefer-default-export
export function updateCell(one, coords, hit) {
  const cell = document.querySelector(
    `.grid--${one ? "two" : "one"} > .grid__cell[data-coords="${JSON.stringify(
      coords,
    )}"]`,
  );
  cell.classList.add(hit ? "grid__cell--hit" : "grid__cell--attacked");
}
