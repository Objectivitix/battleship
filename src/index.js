import game from "./game";
import "./styles.css";

const para = document.querySelector(".winner");

game().then((winner) => {
  para.textContent = `Player ${winner.one ? "1" : "2"} wins!`;
});
