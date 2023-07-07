import Phaser from "phaser";
import background from "../assets/background.png";

const AssetKeys = {
  BACKGROUND: "background",
};

export default class FirstGame extends Phaser.Scene {
  private bg!: Phaser.GameObjects.TileSprite;
  constructor() {
    super({ key: "Game" });
  }

  preload(): void {
    this.load.image(AssetKeys.BACKGROUND, background);
  }

  create(): void {
    const { width, height } = this.scale;
    // Create game objects
    this.bg = this.add
      .tileSprite(0, 0, width, height, AssetKeys.BACKGROUND)
      .setScale(2);

    this.createPlatforms();
  }

  //every frame update
  update(time: number, delta: number) {
    // on each update the image will move
    this.bg.tilePositionX += 0.3;
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");
  }
}
