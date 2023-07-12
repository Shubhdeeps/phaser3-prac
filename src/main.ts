// import FirstGame from "./games/FirstGame";
// import Preload from "./games/components/preload";
// @ts-nocheck
import "./style.css";
import Preloader from "./mouseRunner/windows/Preloader";
import MouseRunner from "./mouseRunner/scenes/Game.Scene";
import GameOver from "./mouseRunner/scenes/GameOver.Scene";
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
      gravity: { y: 400 },
      debug: true,
    },
  },
  // backgroundColor: "#5c5b5b",
  scene: [Preloader, MouseRunner, GameOver],
};

const game = new Phaser.Game(gameConfig);
