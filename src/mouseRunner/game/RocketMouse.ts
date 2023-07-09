import Phaser from "phaser";
import AssetKeys from "../../games/components/constants/assetsKeys";
import RocketMouseAnimationKeys from "../constants/RocketMouseAnimatios";
import SceneKeys from "../constants/SceneKeys";
import { updateLocationRealTime } from "../../firebase/updateDataToRealtime";

enum MouseState {
  Running,
  Killed,
  Dead,
}
// 1. extends the container
export default class RockerMouse extends Phaser.GameObjects.Container {
  private flames: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private mouse: Phaser.GameObjects.Sprite;
  private mouseState = MouseState.Running;
  private mouseEvent: Phaser.Events.EventEmitter =
    new Phaser.Events.EventEmitter();
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // 2. create a object in a constructor
    this.mouse = scene.add.sprite(0, 0, AssetKeys.PLAYER).setOrigin(0.5, 1);
    // .play(RocketMouseAnimationKeys.RUN);

    this.createAnimations();
    this.mouse.play(RocketMouseAnimationKeys.FLAME);
    //add animation , create the flame
    this.flames = scene.add.sprite(-63, -15, AssetKeys.PLAYER);

    // set flames to invisible
    this.enableJetpack(false);
    this.add(this.flames);

    // 3. add the object to container itself
    this.add(this.mouse);
    scene.physics.add.existing(this);

    // adjusting the physical body with the game objects position created above
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.mouse.width, this.mouse.height * 1.7);
    body.setOffset(this.mouse.width * -0.5, -this.mouse.height - 50);
    //init cursors
    this.cursors = scene.input.keyboard!.createCursorKeys();
  }

  //runs automatically before update
  private preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;
    // const x = body.x;
    // const y = body.y;
    // updateLocationRealTime(x, y, "shubh")
    switch (this.mouseState) {
      //allow keyboard updates only when mouse is in running state
      case MouseState.Running: {
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
        break;
      }
      case MouseState.Killed: {
        // reduce the velocity to 99% of current value
        body.velocity.x *= 0.99;

        if (body.velocity.x <= 5) {
          this.mouseState = MouseState.Dead;
        }
        break;
      }
      case MouseState.Dead: {
        body.setVelocity(0, 0);

        //emit an event when mouse is dead
        this.mouseEvent.emit("dead");
        break;
      }
    }
  }
  private enableJetpack(enable: boolean) {
    this.flames.setVisible(enable);
  }

  private kill() {
    if (this.mouseState !== MouseState.Running) {
      return;
    }
    this.mouseState = MouseState.Killed;
    this.mouse.play(RocketMouseAnimationKeys.DEATH);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAccelerationY(0);
    body.setVelocity(600, 0);
    this.enableJetpack(false);
  }

  public getEvent() {
    return this.mouseEvent;
  }

  private createAnimations() {
    this.mouse.anims.create({
      key: RocketMouseAnimationKeys.RUN,
      frames: this.mouse.anims.generateFrameNames(AssetKeys.PLAYER, {
        start: 1,
        end: 4,
        prefix: "rocketmouse_run", // prefix name in json file
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.mouse.anims.create({
      key: RocketMouseAnimationKeys.FLAME,
      frames: this.mouse.anims.generateFrameNames(AssetKeys.PLAYER, {
        start: 1,
        end: 2,
        prefix: "flame", // prefix name in json file
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.mouse.anims.create({
      key: RocketMouseAnimationKeys.DEATH,
      frames: this.mouse.anims.generateFrameNames(AssetKeys.PLAYER, {
        start: 1,
        end: 2,
        prefix: "rocketmouse_dead", // prefix name in json file
        suffix: ".png",
        zeroPad: 2,
      }),
      frameRate: 10,
    });

    this.mouse.anims.create({
      key: RocketMouseAnimationKeys.FALL,
      frames: [
        {
          key: AssetKeys.PLAYER,
          frame: "rocketmouse_fall01.png",
        },
      ],
    });

    this.mouse.anims.create({
      key: RocketMouseAnimationKeys.FLY,
      frames: [
        {
          key: AssetKeys.PLAYER,
          frame: "flying.png",
        },
      ],
    });
  }
}
