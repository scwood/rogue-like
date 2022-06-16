import Phaser, { Scene } from "phaser";

import { Wizard } from "./Wizard";

export class Skeleton extends Phaser.Physics.Arcade.Sprite {
  private _wizard: Wizard;
  private _scene: Scene;
  private _speed = 50;
  private _damage = 10;

  static preload(scene: Phaser.Scene) {
    scene.load.image("skeletonIdle0", "dungeon/skelet_idle_anim_f0.png");
    scene.load.image("skeletonIdle1", "dungeon/skelet_idle_anim_f1.png");
    scene.load.image("skeletonIdle2", "dungeon/skelet_idle_anim_f2.png");
    scene.load.image("skeletonIdle3", "dungeon/skelet_idle_anim_f3.png");
  }

  static createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "skeletonIdle",
      frames: [
        { key: "skeletonIdle0" },
        { key: "skeletonIdle1" },
        { key: "skeletonIdle2" },
        { key: "skeletonIdle3" },
      ],
      frameRate: 8,
      repeat: -1,
    });
  }

  constructor(scene: Phaser.Scene, x: number, y: number, wizard: Wizard) {
    super(scene, x, y, "skeletonIdle0");
    this._scene = scene;
    this._wizard = wizard;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anims.play("skeletonIdle");
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this._scene.physics.moveToObject(this, this._wizard, this._speed);
  }
}
