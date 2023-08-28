import { SHIPS } from "../constants";

import Player from "../core/Player";
import { getGridCell } from "./grid";

export default class Setup {
  static {
    this.modal = document.querySelector(".arrange");
    this.heading = document.querySelector(".arrange__heading");
    this.rotate = document.querySelector(".arrange__rotate");
    this.grid = document.querySelector(".arrange__grid");
    this.cells = this.grid.querySelectorAll(".grid__cell");
  }

  constructor(player) {
    this.player = player;

    this.currShipInfo = null;
    this.vertical = false;
    this.cellsInfo = new Map();

    this.initCellsInfo();
    this.bindRotateButton();
  }

  initCellsInfo() {
    Setup.cells.forEach((cell) => {
      this.cellsInfo.set(cell, { valid: false, cells: null });
    });
  }

  resetCellsInfo() {
    Setup.cells.forEach((cell) => {
      const cellInfo = this.cellsInfo.get(cell);

      cellInfo.valid = false;
      cellInfo.cells = null;
    });
  }

  bindRotateButton() {
    Setup.rotate.addEventListener("click", () => {
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

    Setup.cells.forEach((cell) => {
      const coordsArr = Player.calcCoordsArr(
        this.currShipInfo.length,
        JSON.parse(cell.dataset.coords),
        this.vertical,
      );

      if (this.player.waters.isValid(coordsArr)) {
        this.cellsInfo.get(cell).valid = true;
      }

      this.cellsInfo.get(cell).cells = coordsArr
        .map((coords) => getGridCell(Setup.grid, coords))
        .filter(Boolean);
    });
  }

  async setShips() {
    Setup.cells.forEach(this.bindCellHover.bind(this));

    [this.currShipInfo] = SHIPS;
    this.updateCellsInfo();

    Setup.modal.showModal();
    await this.setShip();

    for (const shipInfo of SHIPS.slice(1)) {
      this.currShipInfo = shipInfo;
      this.updateCellsInfo();

      await this.setShip();
    }

    Setup.modal.close();
  }

  async setShip() {
    Setup.heading.textContent = `Player ${
      this.player.one ? "1" : "2"
    }, place your ${this.currShipInfo.name}!`;

    return new Promise((resolve) => {
      Setup.grid.addEventListener(
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

          Setup.grid.removeEventListener("click", awaitValidPlacement);
          resolve();
        }.bind(this),
      );
    });
  }
}
