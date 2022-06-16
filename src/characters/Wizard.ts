import Phaser from "phaser";

import { FireballSpell } from "../spells/FireballSpell";

export class Wizard extends Phaser.Physics.Arcade.Sprite {
  static preload(scene: Phaser.Scene) {
    scene.load.image("wizardIdle0", "dungeon/wizzard_m_idle_anim_f0.png");
    scene.load.image("wizardIdle1", "dungeon/wizzard_m_idle_anim_f1.png");
    scene.load.image("wizardIdle2", "dungeon/wizzard_m_idle_anim_f2.png");
    scene.load.image("wizardIdle3", "dungeon/wizzard_m_idle_anim_f3.png");
  }

  static createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "wizardIdle",
      frames: [
        { key: "wizardIdle0" },
        { key: "wizardIdle1" },
        { key: "wizardIdle2" },
        { key: "wizardIdle3" },
      ],
      frameRate: 8,
      repeat: -1,
    });
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "wizardIdle0");
    scene.add.existing(this);
    scene.physics.add.existing(this).setSize(14, 20).setOffset(2, 9);
    this.anims.play("wizardIdle");
    new FireballSpell(scene, this).start();
  }
}
