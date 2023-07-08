import Phaser from "phaser";
import AssetKeys from "../../games/components/constants/assetsKeys";
import RocketMouseAnimationKeys from "../constants/RocketMouseAnimatios";

// 1. extends the container
export default class RockerMouse extends Phaser.GameObjects.Container {
  private flames: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private mouse: Phaser.GameObjects.Sprite;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // 2. create a object in a constructor
    this.mouse = scene.add
      .sprite(0, 0, AssetKeys.PLAYER)
      .setOrigin(0.5, 1)
      .play(RocketMouseAnimationKeys.RUN);

    //add animation , create the flame
    this.flames = scene.add
      .sprite(-63, -15, AssetKeys.PLAYER)
      .play(RocketMouseAnimationKeys.FLAME);

    // set flames to invisible
    this.enableJetpack(false);
    this.add(this.flames);

    // 3. add the object to container itself
    this.add(this.mouse);
    scene.physics.add.existing(this);

    // adjusting the physical body with the game objects position created above
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.mouse.width, this.mouse.height);
    body.setOffset(this.mouse.width * -0.5, -this.mouse.height);

    //init cursors
    this.cursors = scene.input.keyboard!.createCursorKeys();
  }

  //runs automatically before update
  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.space?.isDown) {
      body.setAccelerationY(-600);
      this.enableJetpack(true);
      this.mouse.play(RocketMouseAnimationKeys.FLY, true);
    } else {
      body.setAccelerationY(0);
      this.enableJetpack(false);
    }

    // check if touching the ground
    if (body.blocked.down) {
      this.mouse.play(RocketMouseAnimationKeys.RUN, true);
    } else if (body.velocity.y > 0) {
      // when velocity is set to zero, the player is falling
      this.mouse.play(RocketMouseAnimationKeys.FALL, true);
    }
  }
  enableJetpack(enable: boolean) {
    this.flames.setVisible(enable);
  }
}
