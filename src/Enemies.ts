import Phaser from "phaser";
import { Wizard } from "./Wizard";

export class Enemies {
  private _scene: Phaser.Scene;
  private _wizard: Wizard;

  constructor(scene: Phaser.Scene, wizard: Wizard) {
    this._scene = scene;
    this._wizard = wizard;
  }

  spawn() {}
}

class Skeleton extends Phaser.Physics.Arcade.Sprite {
  private _scene: Phaser.Scene;
  private _wizard: Wizard;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "skeltonIdle0");
    this.play("skeletonIdle");
  }

  protected preUpdate(): void {
    this._scene.physics.moveToObject(this, this._wizard);
  }
}
