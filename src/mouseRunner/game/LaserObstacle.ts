import Phaser from "phaser";
import AssetKeys from "../../games/components/constants/assetsKeys";

export default class LaserObstacle extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const top = scene.add.image(0, 0, AssetKeys.LASER_END).setOrigin(0.5, 0);

    const middle = scene.add
      .image(0, top.y + top.displayHeight, AssetKeys.LASER_MIDDLE)
      .setOrigin(0.5, 0);
    //top.y + top.displayHeight will set the middle image right below the top image

    middle.setDisplaySize(middle.width, 200);

    const bottom = scene.add
      .image(0, middle.y + middle.displayHeight, AssetKeys.LASER_END)
      .setOrigin(0.5, 0)
      .setFlipY(true);

    // add them all to the Container
    this.add(top);
    this.add(middle);
    this.add(bottom);

    scene.physics.add.existing(this, true);

    const body = this.body as Phaser.Physics.Arcade.StaticBody;
    const width = top.displayWidth;
    const height =
      top.displayHeight + middle.displayHeight + bottom.displayHeight;

    body.setSize(width * 0.4, height * 0.9);
    body.setOffset(-width * 0.2, 0);

    body.position.x = this.x + body.offset.x;
    body.position.y = this.y;
  }
}
