import AssetKeys from "../constants/assetsKeys";

export function createPlayer(comp: Phaser.Scene) {
  const player = comp.physics.add
    .sprite(310, 100, AssetKeys.PLAYER)
    .setScale(0.3)
    .setBounce(0.1)
    .setOrigin(0.5, 1) //bottom of feet
    .setCollideWorldBounds(false);

  const { width } = comp.scale;
  comp.physics.world.setBounds(
    0,
    0, // x, y
    width, // width, height
    Number.MAX_SAFE_INTEGER
  );

  player.setSize(player.width * 0.8, player.height * 0.9);
  player.setOffset(player.width * 0.1, player.height * 0.1);

  //player sprite
  comp.anims.create({
    key: "left",
    // frames: comp.anims.generateFrameNumbers(AssetKeys.PLAYER, {
    //   start: 0,
    //   end: 3,
    // }),
    frames: [{ key: AssetKeys.PLAYER, frame: 0 }],

    frameRate: 10,
    repeat: -1,
  });

  comp.anims.create({
    key: "turn",
    frames: [{ key: AssetKeys.PLAYER, frame: 0 }],
    frameRate: 20,
  });

  comp.anims.create({
    key: "right",
    frames: [{ key: AssetKeys.PLAYER, frame: 0 }],
    frameRate: 10,
    repeat: -1,
  });

  player.body.setGravityY(300);

  return player;
}
