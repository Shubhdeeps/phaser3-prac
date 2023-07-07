import FirstGame from "./games/FirstGame";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  pixelArt: true,
  scale: {
    parent: "game-container",
    width: 640,
    height: 416,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
    },
  },
  // backgroundColor: "#5c5b5b",
  scene: [FirstGame],
};

const game = new Phaser.Game(gameConfig);
