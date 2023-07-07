import Phaser from "phaser";
import background from "../assets/background.png";
import ground from "../assets/ground.png";
import player from "../assets/player.png";
const AssetKeys = {
  BACKGROUND: "background",
  GROUND: "ground",
  PLAYER: "player",
};

export default class FirstGame extends Phaser.Scene {
  private bg!: Phaser.GameObjects.TileSprite;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super({ key: "Game" });
  }

  preload(): void {
    this.load.image(AssetKeys.BACKGROUND, background);
    this.load.image(AssetKeys.GROUND, ground);
    this.load.image(AssetKeys.PLAYER, player);

    //to load spritesheet
    // this.load.spritesheet("nameofsheet", "locationofsheet", {
    //   frameWidth: 32, frameHeight: 48 //frameWidth of each frame of sprite sheet
    // })
  }

  create(): void {
    const { width, height } = this.scale;
    // Create game objects
    this.bg = this.add
      .tileSprite(0, 0, width, height, AssetKeys.BACKGROUND)
      .setScale(2);
    //player props

    const platforms = this.createPlatforms();

    this.player = this.createPlayer();

    this.physics.add.collider(this.player, platforms);

    this.cursors = this.input.keyboard?.createCursorKeys();
    // const particles = this.add.particles(0, 0, "red", {
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   blendMode: "ADD",
    // });

    // particles.startFollow(player);
  }

  //every frame update
  update(time: number, delta: number) {
    // on each update the image will move
    this.bg.tilePositionX += 0.3;
    this.updatePlayerPosition();
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();
    platforms.create(300, 376, "ground").setScale(0.5).refreshBody();

    platforms.create(350, 280, "ground").setScale(0.2);
    platforms.create(150, 220, "ground").setScale(0.2);
    platforms.create(450, 120, "ground").setScale(0.3);

    return platforms;
  }
  createPlayer() {
    const player = this.physics.add
      .sprite(100, 350, AssetKeys.PLAYER)
      .setScale(0.3)
      .setBounce(0.5)
      .setCollideWorldBounds(true);

    //player sprite
    this.anims.create({
      key: "left",
      // frames: this.anims.generateFrameNumbers(AssetKeys.PLAYER, {
      //   start: 0,
      //   end: 3,
      // }),
      frames: [{ key: AssetKeys.PLAYER, frame: 0 }],

      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: AssetKeys.PLAYER, frame: 0 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: [{ key: AssetKeys.PLAYER, frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    return player;
  }

  updatePlayerPosition() {
    if (this.cursors?.left.isDown) {
      this.player?.setVelocityX(-160);
      // this.player?.anims.play("left", true);
    } else if (this.cursors?.right.isDown) {
      this.player?.setVelocityX(160);
      // this.player?.anims.play("left", true);
    } else {
      // if vilocity isnot set to zero then player will keep moving
      this.player?.setVelocityX(0);
    }
    console.log(this.player?.body.touching.down);
    if (this.cursors?.up.isDown) {
      this.player?.setVelocityY(-330);
    }
  }
}
