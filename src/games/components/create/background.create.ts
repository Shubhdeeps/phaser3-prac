import AssetKeys from "../constants/assetsKeys";

export function addBackground(component: Phaser.Scene) {
  const { width, height } = component.scale;
  // Create game objects
  //tile sprite is use to repeat an image over an over again
  const bg = component.add
    .tileSprite(0, 0, width, height, AssetKeys.BACKGROUND)
    .setScale(2, 4);
  bg.setOrigin(0, 0);

  // Set the background position to be fixed
  bg.setScrollFactor(0);
  return bg;
}
