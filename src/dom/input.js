// Functions to obtain human input.
// Forgive me, here goes mutable global states
// implicitly used in functions... (or can I use classes?)
import { SHIPS } from "../constants";

import { containsEqual } from "../lib/equality";

import Player from "../core/Player";

class Setup {
  static {
    this.modal = document.querySelector(".arrange");
    this.heading = document.querySelector(".arrange__heading");
    this.rotate = document.querySelector(".arrange__rotate");
    this.grid = document.querySelector(".arrange__grid");
    this.cells = this.grid.querySelectorAll(".grid__cell");
  }

  constructor() {
    this.currShipInfo = null;
    this.vertical = false;

    this.bindRotateButton();
  }

  bindRotateButton() {
    Setup.rotate.addEventListener("click", () => {
      this.vertical = !this.vertical;
    });
  }

  static cleanUp() {
    Setup.cells.forEach((cell) => {
      delete cell.dataset.invalid;
    });
  }

  async setShips(player) {
    Setup.cells.forEach((cell) => {
      cell.addEventListener("mouseover", () => {
        const coordsArr = Player.calcCoordsArr(
          this.currShipInfo.length,
          JSON.parse(cell.dataset.coords),
          this.vertical,
        );
        if (!player.waters.isValid(coordsArr)) {
          cell.dataset.invalid = "invalid";
        }
      });

      cell.addEventListener("mouseleave", () => {
        delete cell.dataset.invalid;
      });
    });

    Setup.modal.showModal();

    for (const shipInfo of SHIPS) {
      this.currShipInfo = shipInfo;
      await this.setShip(player);
    }

    Setup.modal.close();
    Setup.cleanUp();
  }

  async setShip(player) {
    Setup.heading.textContent = `Player ${player.one ? "1" : "2"}, place your ${
      this.currShipInfo.name
    }!`;

    const self = this;

    return new Promise((resolve) => {
      Setup.grid.addEventListener("click", function awaitValidPlacement(evt) {
        if (evt.target.dataset.invalid) {
          return;
        }
        player.setShip(
          self.currShipInfo.length,
          JSON.parse(evt.target.dataset.coords),
          self.vertical,
        );
        Setup.grid.removeEventListener("click", awaitValidPlacement);
        resolve();
      });
    });
  }
}

const setup = new Setup();

export async function arrangeHumanFleet(player) {
  await setup.setShips(player);
}

export async function getHumanMove(one, possibleMoves) {
  const grid = document.querySelector(`.grid--${one ? "two" : "one"}`);

  return new Promise((resolve) => {
    grid.addEventListener("click", function awaitValidMove(evt) {
      if (!evt.target.classList.contains("grid__cell")) {
        return;
      }

      const coords = JSON.parse(evt.target.dataset.coords);

      if (!containsEqual(possibleMoves, coords)) {
        return;
      }

      grid.removeEventListener("click", awaitValidMove);
      resolve(coords);
    });
  });
}
