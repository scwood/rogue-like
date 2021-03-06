import Phaser from "phaser";
import { Fireball } from "./Fireball";
import { Wizard } from "../characters/Wizard";

export class FireballSpell {
  private _scene: Phaser.Scene;
  private _wizard: Wizard;
  private _intervalId: number;

  constructor(scene: Phaser.Scene, wizard: Wizard) {
    this._scene = scene;
    this._wizard = wizard;
  }

  start() {
    this._intervalId = window.setInterval(() => {
      const fireball = new Fireball(
        this._scene,
        this._wizard.x,
        this._wizard.y
      );
    }, 2000);
  }

  stop() {
    window.clearInterval(this._intervalId);
  }
}
