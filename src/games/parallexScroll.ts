// @ts-nocheck
import Phaser from "phaser";
import background from "../assets/background.png";
import fog from "../assets/fog.png";
import foreground from "../assets/foreground.png";
import trees from "../assets/trees.png";
const { Scene } = Phaser;

const AssetKeys = {
  BACKGROUND: "background",
  FOG: "fog",
  FOREGROUND: "foreground",
  TREES: "trees",
};

class Game extends Scene {
  private bg!: Phaser.GameObjects.TileSprite;
  private fg!: Phaser.GameObjects.TileSprite;
  private trees!: Phaser.GameObjects.TileSprite;
  private fog!: Phaser.GameObjects.TileSprite;
  constructor() {
    super({ key: "Game" });
  }

  preload(): void {
    this.load.image(AssetKeys.BACKGROUND, background);
    this.load.image(AssetKeys.TREES, trees);
    this.load.image(AssetKeys.FOREGROUND, foreground);
    this.load.image(AssetKeys.FOG, fog);
  }

  create(): void {
    const { width, height } = this.scale;
    // Create game objects
    this.bg = this.add
      .tileSprite(0, 0, width, height, AssetKeys.BACKGROUND)
      .setScale(2);
    this.trees = this.add
      .tileSprite(0, 0, width, height, AssetKeys.TREES)
      .setScale(2);
    this.fog = this.add
      .tileSprite(0, 0, width, height, AssetKeys.FOG)
      .setScale(2);
    this.fg = this.add
      .tileSprite(0, 0, width, height, AssetKeys.FOREGROUND)
      .setScale(2);
  }

  //every frame update
  update(time: number, delta: number) {
    // on each update the image will move
    this.bg.tilePositionX += 0.3;
    this.trees.tilePositionX += 0.5;
    this.fg.tilePositionX += 0.7;
    this.fog.tilePositionX += 0.9;
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  pixelArt: true,
  scale: {
    parent: "game-container",
    width: 640,
    height: 416,
  },
  backgroundColor: "#5c5b5b",
  scene: [Game],
};

const game = new Phaser.Game(gameConfig);
