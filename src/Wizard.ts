import Phaser from "phaser";
import { FireballSpell } from "./FireballSpell";

export class Wizard extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "wizardIdle0");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    new FireballSpell(scene, this).start();
  }
}
