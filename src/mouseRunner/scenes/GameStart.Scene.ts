import Phaser from "phaser";
import SceneKeys from "../constants/SceneKeys";
import EventDispatcher from "../event/EventDispatcher";
// import { emitter } from "../constants/EventEmitter";

export default class GameStart extends Phaser.Scene {
  // @ts-ignore
  private name!: string;
  constructor() {
    super(SceneKeys.GameStart);
  }
  create() {
    const { width } = this.scale;
    const x = width * 0.5;
    const y = width * 0.5;

    this.add
      .text(x, y, "Please enter your name and start", {
        fontSize: "32px",
        color: "#FFFFFF",
        backgroundColor: "#000000",
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      })
      .setOrigin(0.5);

    // const emitter = new Phaser.Events.EventEmitter();
    this.input.keyboard?.once("keydown-SPACE", () => {
      const emitter = EventDispatcher.getInstance();
      emitter.emit("start-new-game");

      this.scene.stop(SceneKeys.GameStart);

      //   //re-start the game scene
      //   this.scene.stop(SceneKeys.Game);
      //   this.scene.start(SceneKeys.Game);
    });
  }
}
