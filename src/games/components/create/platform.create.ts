export function createPlatform(component: Phaser.Scene) {
  // const platforms = this.physics.add.staticGroup();
  // platforms.create(400, 800, "ground").refreshBody();
  const { width } = component.scale;
  const platform = component.physics.add.staticSprite(width / 2, 800, "ground");

  return platform;
}
