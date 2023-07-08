import Phaser from "phaser";
import SceneKeys from "./constants/SceneKeys";
import AssetKeys from "../games/components/constants/assetsKeys";
import RocketMouseAnimationKeys from "./constants/RocketMouseAnimatios";
import RockerMouse from "./game/RocketMouse";
import LaserObstacle from "./game/LaserObstacle";

//page 66
export default class MouseRunner extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private mouseHole!: Phaser.GameObjects.Image;
  private window1!: Phaser.GameObjects.Image;
  private window2!: Phaser.GameObjects.Image;
  private bookcase1!: Phaser.GameObjects.Image;
  private bookcase2!: Phaser.GameObjects.Image;
  private laserObstacle!: LaserObstacle;

  constructor() {
    super({ key: SceneKeys.Game });
  }
  create(): void {
    const { width, height } = this.scale;
    this.background = this.add
      .tileSprite(0, 0, width, height, AssetKeys.BACKGROUND)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0); //avoid scrolling when camera follows the player

    //Mouse hole
    this.mouseHole = this.add.image(
      Phaser.Math.Between(900, 1500),
      501,
      AssetKeys.MOUSE_HOLE
    );

    //Windows
    this.window1 = this.add.image(
      Phaser.Math.Between(900, 1300),
      200,
      AssetKeys.WINDOW_1
    );

    this.window2 = this.add.image(
      Phaser.Math.Between(1600, 2000),
      200,
      AssetKeys.WINDOW_2
    );

    //Book case

    this.bookcase1 = this.add
      .image(Phaser.Math.Between(2200, 2700), 580, AssetKeys.BOOKCASE_1)
      .setOrigin(0.5, 1);
    this.bookcase2 = this.add
      .image(Phaser.Math.Between(2900, 3400), 580, AssetKeys.BOOKCASE_2)
      .setOrigin(0.5, 1);

    //laser obstacle
    this.laserObstacle = new LaserObstacle(this, 900, 100);
    this.add.existing(this.laserObstacle);

    // mouse
    const mouse = new RockerMouse(this, width * 0.5, height - 30);
    this.add.existing(mouse); // add the rocket mouse instance to the scene

    // const mouse = this.physics.add
    //   .sprite(width * 0.5, height * 0.5, AssetKeys.PLAYER, "flying.png")
    //   .setOrigin(0.5, 1)
    //   .play(RocketMouseAnimationKeys.RUN);

    const body = mouse.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setVelocityX(140);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);
    this.cameras.main.startFollow(mouse);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);

    this.physics.add.overlap(
      this.laserObstacle,
      mouse,
      this.handleOverLapLaser,
      undefined,
      this
    );
  }

  update(time: number, delta: number): void {
    // the background will scroll in x direction along with camera
    this.background.setTilePosition(this.cameras.main.scrollX);
    this.wrapMouseHole();
    this.wrapWindow();
    this.wrapBookcase();
    this.wrapLaserObstacle();
  }

  private wrapMouseHole() {
    // current x position of camera (the starting left side position of window)
    const scrollX = this.cameras.main.scrollX;

    //right edge
    const rightEdge = scrollX + this.scale.width;

    //if mouse hole right side is less than current scroll location
    if (this.mouseHole.x + this.mouseHole.width < scrollX) {
      this.mouseHole.x = Phaser.Math.Between(rightEdge + 100, rightEdge + 1000);
    }
  }

  private wrapWindow() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let width = this.window1.width * 2;
    if (this.window1.x + width < scrollX) {
      this.window1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800
      );
    }

    width = this.window2.width * 2;
    if (this.window2.x + width < scrollX) {
      this.window2.x = Phaser.Math.Between(
        this.window1.x + width,
        this.window1.x + width + 800
      );
    }
  }

  private wrapBookcase() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let width = this.bookcase1.width * 2;
    if (this.bookcase1.x + width < scrollX) {
      this.bookcase1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800
      );
    }

    width = this.bookcase2.width;
    if (this.bookcase2.x + width < scrollX) {
      this.bookcase2.x = Phaser.Math.Between(
        this.bookcase1.x + width,
        this.bookcase1.x + width + 800
      );
    }
  }

  private wrapLaserObstacle() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    //body variable with speicific phycis body type
    const body = this.laserObstacle.body as Phaser.Physics.Arcade.StaticBody;

    const width = body.width;
    if (this.laserObstacle.x + width < scrollX) {
      this.laserObstacle.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 1000
      );
      this.laserObstacle.y = Phaser.Math.Between(0, 300);

      body.position.x = this.laserObstacle.x + body.offset.x;
      body.position.y = this.laserObstacle.y;
    }
  }

  private handleOverLapLaser(obj1: any, obj2: any) {
    console.log("overlapped");
  }
}
