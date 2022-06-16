import Phaser from "phaser";
import { coinFlip, getRandomInt } from "../utils/random";
import { Skeleton } from "./Skeleton";
import { Wizard } from "./Wizard";

export class Enemies {
  private _scene: Phaser.Scene;
  private _wizard: Wizard;
  private _startTime: Date;
  private _enemies: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene, wizard: Wizard) {
    this._scene = scene;
    this._wizard = wizard;

    this._enemies = scene.physics.add.group({
      max: 100,
    });

    this._scene.physics.add.collider(this._enemies, this._enemies);
    this._scene.physics.add.collider(
      this._enemies,
      this._wizard,
      (enemy, wizard) => {
        this._scene.cameras.main.shake(10, 0.01);
      }
    );
  }

  spawn() {
    this._startTime = new Date();
    setInterval(() => {
      const [x, y] = this._getOffCameraSpawnPoint();
      this._enemies.add(new Skeleton(this._scene, x, y, this._wizard));
    }, 100);
  }

  private _getOffCameraSpawnPoint(): [number, number] {
    const { width, height } = this._scene.scale;
    const { x: wizardX, y: wizardY } = this._wizard;
    const isVertical = coinFlip();
    const isNegative = coinFlip();
    let x;
    let y;
    if (isVertical) {
      x = getRandomInt(-width / 2, width / 2);
      y = height / 2 + 16;
      y = isNegative ? -1 * y : y;
    } else {
      x = width / 2 + 16;
      x = isNegative ? -1 * x : x;
      y = getRandomInt(-height / 2, height / 2);
    }
    return [wizardX + x, wizardY + y];
  }
}
