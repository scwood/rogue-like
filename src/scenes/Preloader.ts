import Phaser from "phaser";

import { Fireball } from "../spells/Fireball";
import { Skeleton } from "../characters/Skeleton";
import { Wizard } from "../characters/Wizard";

export class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    Fireball.preload(this);
    Skeleton.preload(this);
    Wizard.preload(this);

    this.load.image("floor", "dungeon/floor_1.png");
  }

  create() {
    Skeleton.createAnimations(this);
    Wizard.createAnimations(this);

    this.scene.start("game");
  }
}
