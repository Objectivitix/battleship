import game from "./game";
import "./styles.css";

game().then((winner) => console.log(`Player ${winner.name} wins!`));
