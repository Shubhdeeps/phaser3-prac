import background from "../../../assets/background.png";
import player from "../../../assets/player.png";
import ground from "../../../assets/ground.png";
import AssetKeys from "../constants/assetsKeys";
import Phaser from "phaser";
import SceneKeys from "../constants/sceneKeys";

export default class Preload extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload(): void {
    this.load.image(AssetKeys.BACKGROUND, background);
    this.load.image(AssetKeys.GROUND, ground);
    this.load.image(AssetKeys.PLAYER, player);
  }

  create() {
    //add sprite animations here

    // the game class will be called only when the preload() is completed;
    this.scene.start(SceneKeys.Game);
  }
}
