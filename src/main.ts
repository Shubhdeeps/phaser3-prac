// import FirstGame from "./games/FirstGame";
// import Preload from "./games/components/preload";
// @ts-ignore
import { SceneDebug } from "phaser";
import Preloader from "./mouseRunner/windows/Preloader";
import MouseRunner from "./mouseRunner";
const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  scale: {
    parent: "game-container",
    width: 800,
    height: 640,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
      debug: true,
    },
  },
  // backgroundColor: "#5c5b5b",
  scene: [Preloader, MouseRunner],
};

const game = new Phaser.Game(gameConfig);
