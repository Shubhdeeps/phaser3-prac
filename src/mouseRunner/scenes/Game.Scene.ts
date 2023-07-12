// @ts-nocheck
import Phaser from "phaser";
import SceneKeys from "../constants/SceneKeys";
import AssetKeys from "../../games/components/constants/assetsKeys";
import RockerMouse from "../game/RocketMouse";
import LaserObstacle from "../game/LaserObstacle";
import EventDispatcher from "../event/EventDispatcher";
import { updateDataToRealTime } from "../../firebase/updateDataToRealtime";

//page 84
export default class MouseRunner extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private mouseHole!: Phaser.GameObjects.Image;
  private window1!: Phaser.GameObjects.Image;
  private window2!: Phaser.GameObjects.Image;
  private bookcase1!: Phaser.GameObjects.Image;
  private bookcase2!: Phaser.GameObjects.Image;
  private laserObstacle!: LaserObstacle;
  private coins!: Phaser.Physics.Arcade.StaticGroup;
  private scoreLabel!: Phaser.GameObjects.Text;
  private score = 0;
  private mouse!: RockerMouse;
  constructor() {
    super({ key: SceneKeys.Game });
  }

  //called when the scene is started
  //this method is called before preload
  init() {
    this.score = 0;
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
    this.mouse = new RockerMouse(this, width * 0.5, height - 30);
    const mouse = this.mouse;
    this.add.existing(mouse); // add the rocket mouse instance to the scene

    // const mouse = this.physics.add
    //   .sprite(width * 0.5, height * 0.5, AssetKeys.PLAYER, "flying.png")
    //   .setOrigin(0.5, 1)
    //   .play(RocketMouseAnimationKeys.RUN);

    const body = mouse.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setVelocityX(250);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55);
    this.cameras.main.startFollow(mouse);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);

    this.physics.add.overlap(
      this.laserObstacle,
      mouse,
      this.handleOverLapLaser,
      undefined,
      this
    );

    //Events
    mouse.getEvent().once("dead", () => {
      this.scene.run(SceneKeys.GameOver);
    });

    const emitter = EventDispatcher.getInstance();

    emitter.once("start-new-game", () => {
      updateDataToRealTime(this.score);
      this.scene.restart();
    });

    //Coins
    this.coins = this.physics.add.staticGroup();
    this.spawnCoins();

    //coin collision
    this.physics.add.overlap(
      this.coins,
      mouse,
      this.handleCollectCoin,
      undefined,
      this
    );

    // coins score
    this.scoreLabel = this.add
      .text(10, 10, `Score: ${this.score}`, {
        fontSize: "24px",
        color: "#080808",
        backgroundColor: "#F8E71C",
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      })
      .setScrollFactor(0);
  }

  update(time: number, delta: number): void {
    // the background will scroll in x direction along with camera
    this.background.setTilePosition(this.cameras.main.scrollX);
    this.wrapMouseHole();
    this.wrapWindow();
    this.wrapBookcase();
    this.wrapLaserObstacle();
    this.teleportBackwards();
  }

  private spawnCoins() {
    // @ts-ignore
    this.coins.children.each((child: Phaser.GameObjects.GameObject): void => {
      const coin = child as Phaser.Physics.Arcade.Sprite;
      this.coins.killAndHide(coin);
      coin.body!.enable = false;
    });

    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let x = rightEdge + 100;
    const numCOins = Phaser.Math.Between(1, 20);

    for (let i = 0; i < numCOins; i++) {
      const coin = this.coins.get(
        x,
        Phaser.Math.Between(100, this.scale.height - 100),
        AssetKeys.COINS
      ) as Phaser.Physics.Arcade.Sprite;

      coin.setVisible(true);
      coin.setActive(true);

      const body = coin.body as Phaser.Physics.Arcade.StaticBody;
      body.setCircle(body.width * 0.5);
      body.enable = true;

      // update the body x, y position from the GameObject
      body.updateFromGameObject();
      x += coin.width * 1.5;
    }
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
    obj2.kill();
  }

  private handleCollectCoin(obj1: any, obj2: any) {
    const coin = obj2 as Phaser.Physics.Arcade.Sprite;
    this.coins.killAndHide(coin);

    this.score += 1;
    this.scoreLabel.text = `Score: ${this.score}`;
    //turn off the physics body
    coin.body!.enable = false;
  }

  private teleportBackwards() {
    const { scrollX } = this.cameras.main;
    const maxX = 2380; // background width (340px) * 7 = 2380

    if (scrollX > maxX) {
      this.mouse.x -= maxX;
      this.mouseHole.x -= maxX;

      this.window1.x -= maxX;
      this.window2.x -= maxX;

      this.bookcase1.x -= maxX;
      this.bookcase2.x -= maxX;

      this.laserObstacle.x -= maxX;
      const laserBody = this.laserObstacle
        .body as Phaser.Physics.Arcade.StaticBody;
      laserBody.x -= maxX;

      this.spawnCoins();
      // @ts-ignore
      this.coins.children.each((child) => {
        const coin = child as Phaser.Physics.Arcade.Sprite;
        if (!coin.active) {
          return;
        }

        coin.x -= maxX;
        const body = coin.body as Phaser.Physics.Arcade.StaticBody;
        body.updateFromGameObject();
      });
    }
  }
}
