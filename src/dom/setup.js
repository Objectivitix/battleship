import { SHIPS } from "../constants";

import Player from "../core/Player";
import { getGridCell } from "./grid";

export default class Setup {
  constructor(player) {
    this.player = player;

    this.currShipInfo = null;
    this.vertical = false;
    this.cellsInfo = new Map();

    this.modal = document.querySelector(".arrange");
    this.heading = document.querySelector(".arrange__heading");
    this.rotate = document.querySelector(".arrange__rotate");
    this.grid = document.querySelector(".arrange__grid");
    this.cells = this.grid.querySelectorAll(".grid__cell");

    this.initCellsInfo();
    this.bindRotateButton();
    this.cells.forEach(this.bindCellHover.bind(this));
  }

  cleanUp() {
    this.cells.forEach((cell) => {
      cell.classList.remove("grid__cell--placed");
    });

    const clone = this.modal.cloneNode(true);
    this.modal.replaceWith(clone);
  }

  initCellsInfo() {
    this.cells.forEach((cell) => {
      this.cellsInfo.set(cell, { valid: false, cells: null });
    });
  }

  resetCellsInfo() {
    this.cells.forEach((cell) => {
      const cellInfo = this.cellsInfo.get(cell);

      cellInfo.valid = false;
      cellInfo.cells = null;
    });
  }

  bindRotateButton() {
    this.rotate.addEventListener("click", () => {
      this.vertical = !this.vertical;
      this.updateCellsInfo();
    });
  }

  bindCellHover(cell) {
    const cellInfo = this.cellsInfo.get(cell);

    cell.addEventListener("mouseover", () => {
      const modifier = cellInfo.valid
        ? "grid__cell--valid"
        : "grid__cell--invalid";

      cellInfo.cells.forEach((other) => {
        other.classList.add(modifier);
      });
    });

    cell.addEventListener("mouseleave", () => {
      cellInfo.cells.forEach((other) => {
        other.classList.remove("grid__cell--valid");
        other.classList.remove("grid__cell--invalid");
      });
    });

    cell.addEventListener("click", () => {
      cellInfo.cells.forEach((other) => {
        other.classList.remove("grid__cell--valid");
      });
    });
  }

  updateCellsInfo() {
    this.resetCellsInfo();

    this.cells.forEach((cell) => {
      const coordsArr = Player.calcCoordsArr(
        this.currShipInfo.length,
        JSON.parse(cell.dataset.coords),
        this.vertical,
      );

      if (this.player.waters.isValid(coordsArr)) {
        this.cellsInfo.get(cell).valid = true;
      }

      this.cellsInfo.get(cell).cells = coordsArr
        .map((coords) => getGridCell(this.grid, coords))
        .filter(Boolean);
    });
  }

  async setShips() {
    [this.currShipInfo] = SHIPS;
    this.updateCellsInfo();

    this.modal.showModal();
    await this.setShip();

    for (const shipInfo of SHIPS.slice(1)) {
      this.currShipInfo = shipInfo;
      this.updateCellsInfo();

      await this.setShip();
    }

    this.modal.close();
    this.cleanUp();
  }

  async setShip() {
    this.heading.textContent = `Player ${
      this.player.one ? "1" : "2"
    }, place your ${this.currShipInfo.name}!`;

    return new Promise((resolve) => {
      this.grid.addEventListener(
        "click",
        function awaitValidPlacement(evt) {
          if (!evt.target.classList.contains("grid__cell")) {
            return;
          }

          const cellInfo = this.cellsInfo.get(evt.target);

          if (!cellInfo.valid) {
            return;
          }

          cellInfo.cells.forEach((cell) => {
            cell.classList.add("grid__cell--placed");
          });

          this.player.setShip(
            this.currShipInfo.length,
            JSON.parse(evt.target.dataset.coords),
            this.vertical,
          );

          this.grid.removeEventListener("click", awaitValidPlacement);
          resolve();
        }.bind(this),
      );
    });
  }
}
