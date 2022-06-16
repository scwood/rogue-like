import Phaser from "phaser";
import { FireballSpell } from "./FireballSpell";

export class Fireball extends Phaser.Physics.Arcade.Sprite {
  private _damage = 10;

  static preload(scene: Phaser.Scene) {
    scene.load.image("fireball", "fireball.png");
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "fireball");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setVelocity(120, 0);
  }
}
