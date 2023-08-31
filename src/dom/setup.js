import { SHIPS } from "../constants";

import Player from "../core/Player";
import { getGridCell } from "./grid";

const modal = document.querySelector(".arrange");
const heading = document.querySelector(".arrange__heading");
const rotate = document.querySelector(".arrange__rotate");
const grid = document.querySelector(".arrange__grid");
const cells = grid.querySelectorAll(".grid__cell");

export default class Setup {
  constructor(player) {
    this.player = player;

    this.currShipInfo = null;
    this.vertical = false;
    this.cellsInfo = new Map();

    this.initCellsInfo();
    this.bindRotateButton();
    cells.forEach(this.bindCellHover.bind(this));
  }

  initCellsInfo() {
    cells.forEach((cell) => {
      this.cellsInfo.set(cell, { valid: false, cells: null });
    });
  }

  resetCellsInfo() {
    cells.forEach((cell) => {
      const cellInfo = this.cellsInfo.get(cell);

      cellInfo.valid = false;
      cellInfo.cells = null;
    });
  }

  bindRotateButton() {
    rotate.addEventListener("click", () => {
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

    cells.forEach((cell) => {
      const coordsArr = Player.calcCoordsArr(
        this.currShipInfo.length,
        JSON.parse(cell.dataset.coords),
        this.vertical,
      );

      if (this.player.waters.isValid(coordsArr)) {
        this.cellsInfo.get(cell).valid = true;
      }

      this.cellsInfo.get(cell).cells = coordsArr
        .map((coords) => getGridCell(grid, coords))
        .filter(Boolean);
    });
  }

  async setShips() {
    [this.currShipInfo] = SHIPS;
    this.updateCellsInfo();

    modal.showModal();
    await this.setShip();

    for (const shipInfo of SHIPS.slice(1)) {
      this.currShipInfo = shipInfo;
      this.updateCellsInfo();

      await this.setShip();
    }

    modal.close();
  }

  async setShip() {
    heading.textContent = `Player ${this.player.one ? "1" : "2"}, place your ${
      this.currShipInfo.name
    }!`;

    return new Promise((resolve) => {
      grid.addEventListener(
        "click",
        function awaitValidPlacement(evt) {
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

          grid.removeEventListener("click", awaitValidPlacement);
          resolve();
        }.bind(this),
      );
    });
  }
}
