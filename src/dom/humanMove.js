const BUTTON = document.querySelector("button");

export default async function getHumanMove(player) {
  return JSON.parse(prompt("coords:"));
  // return new Promise((resolve) => {
  //   BUTTON.addEventListener(
  //     "click",
  //     () => {
  //       resolve([0, 1]);
  //     },
  //     { once: true },
  //   );
  // });
}
