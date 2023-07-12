import Phaser from "phaser";
import SceneKeys from "../constants/SceneKeys";
import AssetKeys from "../constants/assetsKeys";
import background from "../assets/background/bg_repeat_340x640.png";
import player from "../assets/player/player.png";
import playerJSON from "../assets/player/player.json";
import mouseHole from "../assets/background/object_mousehole.png";
import window1 from "../assets/background/object_window1.png";
import window2 from "../assets/background/object_window2.png";
import bookcase1 from "../assets/background/object_bookcase1.png";
import bookcase2 from "../assets/background/object_bookcase2.png";
import laserMiddle from "../assets/background/object_laser.png";
import laserEnd from "../assets/background/object_laser_end.png";
import coins from "../assets/background/object_coin.png";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.Preloader });
  }
  preload() {
    this.load.image(AssetKeys.BACKGROUND, background);
    this.load.image(AssetKeys.MOUSE_HOLE, mouseHole);
    this.load.image(AssetKeys.WINDOW_1, window1);
    this.load.image(AssetKeys.WINDOW_2, window2);
    this.load.image(AssetKeys.BOOKCASE_1, bookcase1);
    this.load.image(AssetKeys.BOOKCASE_2, bookcase2);
    this.load.image(AssetKeys.LASER_END, laserEnd);
    this.load.image(AssetKeys.LASER_MIDDLE, laserMiddle);
    this.load.image(AssetKeys.COINS, coins);

    this.load.atlas(AssetKeys.PLAYER, player, playerJSON);
  }

  create() {
    this.scene.start(SceneKeys.Game);
  }
}
