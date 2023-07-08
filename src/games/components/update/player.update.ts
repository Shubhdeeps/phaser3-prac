type Comp = Phaser.Scene & { [key: string]: any };

export function playerUpdate(comp: Comp) {
  if (comp.cursors?.left.isDown) {
    comp.player?.setVelocityX(-160).setFlipX(false);
    // comp.player?.anims.play("left", true);
    comp.bg.tilePositionX -= 0.3;
  } else if (comp.cursors?.right.isDown) {
    comp.player?.setVelocityX(-160).setFlipX(true);
    comp.player?.setVelocityX(160);
    comp.bg.tilePositionX += 0.3;

    // comp.player?.anims.play("left", true);
  } else {
    // if vilocity isnot set to zero then player will keep moving
    comp.player?.setVelocityX(0);
  }
  console.log();
  // console.log(comp.jumpKey?.isDown);
  if (comp.jumpKey?.isDown && comp.player?.body.touching.down) {
    comp.player?.setVelocityY(-450);
  }
}
