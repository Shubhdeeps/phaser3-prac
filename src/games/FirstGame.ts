import Phaser from "phaser";
import {
  addBackground,
  createPlatform,
  createPlayer,
} from "./components/create";
import { playerUpdate } from "./components/update";
import SceneKeys from "./components/constants/sceneKeys";

export default class FirstGame extends Phaser.Scene {
  // we need private fields for variables that are used across multiple functions
  private bg!: Phaser.GameObjects.TileSprite;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private jumpKey: Phaser.Input.Keyboard.Key | undefined;
  private playerCollidedPosition = 0;
  private generatedPlatforms!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super({ key: SceneKeys.Game });
  }

  create(): void {
    this.playerCollidedPosition = this.game.scale.height;
    this.bg = addBackground(this);

    const platforms = createPlatform(this);

    this.player = createPlayer(this);

    // Set the camera to follow the player
    this.cameras.main.startFollow(this.player);
    // add collider btw player and platforms
    this.physics.add.collider(
      this.player,
      platforms,
      this.collisionHandler,
      undefined,
      this
    );

    // add a cursor to the game
    this.cursors = this.input.keyboard?.createCursorKeys();

    //adding keys
    this.jumpKey = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.generatedPlatforms = this.physics.add.staticGroup();

    // create a platform, when player touches the previous platform
  }

  collisionHandler(player: any, _platform: any) {
    // create a platform on first collide
    const position = player.body.y;
    // return if platform y is
    if (_platform.body.y < position) {
      console.log(_platform.body.y + 20, position);
      return;
    }
    if (this.playerCollidedPosition > position) {
      //create a platform at random x direction
      const y = position - 150;

      const newPlatform1 = this.createARandomizedPlatform(y);
      // const newPlatform2 = this.createARandomizedPlatform(y);
      this.generatedPlatforms.add(newPlatform1);
      // this.generatedPlatforms.add(newPlatform2);
      // update the position

      this.physics.add.collider(
        player,
        newPlatform1,
        this.collisionHandler,
        undefined,
        this
      );

      // this.physics.add.collider(
      //   player,
      //   newPlatform2,
      //   this.collisionHandler,
      //   undefined,
      //   this
      // );
      this.playerCollidedPosition = position;
    }
  }

  createARandomizedPlatform(y: number) {
    const minWidth = 100;
    const maxWidth = 300;
    const _width = Phaser.Math.Between(minWidth, maxWidth);
    const height = 20;
    const { width } = this.scale;
    const x = Phaser.Math.Between(0, width) - _width;
    const platform = this.add
      .rectangle(x, y, _width, height, 0x00ff00)
      .setOrigin(0.5, 0); // origin middle top

    // this.tweens.add({
    //   targets: platform,
    //   x: 0,
    //   ease: "Linear",
    //   duration: 2000,
    //   yoyo: true, // Repeat the tween in reverse
    //   repeat: -1, // Repeat indefinitely
    // });

    return platform;
  }

  //every frame update
  update(time: number, delta: number) {
    // on each update the image will move
    playerUpdate(this);
  }
}
