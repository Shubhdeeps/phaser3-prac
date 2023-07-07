import FirstGame from "./games/FirstGame";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  pixelArt: true,
  scale: {
    parent: "game-container",
    width: 800,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  // backgroundColor: "#5c5b5b",
  scene: [FirstGame],
};

const game = new Phaser.Game(gameConfig);
