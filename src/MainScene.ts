import Phaser from "phaser";

import fireballImage from "../assets/fireball.png";
import floorImage from "../assets/dungeon/floor_1.png";
import wizardIdle0 from "../assets/dungeon/wizzard_m_idle_anim_f0.png";
import wizardIdle1 from "../assets/dungeon/wizzard_m_idle_anim_f1.png";
import wizardIdle2 from "../assets/dungeon/wizzard_m_idle_anim_f2.png";
import wizardIdle3 from "../assets/dungeon/wizzard_m_idle_anim_f3.png";
import skeletonRun0 from "../assets/dungeon/skelet_idle_anim_f0.png";
import skeletonRun1 from "../assets/dungeon/skelet_idle_anim_f1.png";
import skeletonRun2 from "../assets/dungeon/skelet_idle_anim_f2.png";
import skeletonRun3 from "../assets/dungeon/skelet_idle_anim_f3.png";
import { Wizard } from "./Wizard";

export class MainScene extends Phaser.Scene {
  private _player: Phaser.Physics.Arcade.Sprite;
  private _playerSpeed = 50;
  private _background: Phaser.GameObjects.TileSprite;
  private _keys: {
    up: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("floor", floorImage);
    this.load.image("fireball", fireballImage);
    this.load.image("wizardIdle0", wizardIdle0);
    this.load.image("wizardIdle1", wizardIdle1);
    this.load.image("wizardIdle2", wizardIdle2);
    this.load.image("wizardIdle3", wizardIdle3);
    this.load.image("skeletonRun0", skeletonRun0);
    this.load.image("skeletonRun1", skeletonRun1);
    this.load.image("skeletonRun2", skeletonRun2);
    this.load.image("skeletonRun3", skeletonRun3);
  }

  create() {
    this.anims.create({
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

    this.anims.create({
      key: "skeletonRun",
      frames: [
        { key: "skeletonRun0" },
        { key: "skeletonRun1" },
        { key: "skeletonRun2" },
        { key: "skeletonRun3" },
      ],
      frameRate: 8,
      repeat: -1,
    });

    this.physics.world.fixedStep = false;
    this._keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    const { width, height } = this.scale;
    this._background = this.add
      .tileSprite(0, 0, width, height, "floor")
      .setScrollFactor(0, 0)
      .setOrigin(0, 0);

    this._player = new Wizard(this, 0, 0).play("wizardIdle");
    this.cameras.main.startFollow(this._player);
    this.physics.add.sprite(0, 0, "skeletonRun0").play("skeletonRun");
  }

  update() {
    const playerVector = new Phaser.Math.Vector2(0, 0);

    if (this._keys.left.isDown) {
      playerVector.x = -1;
      this._player.flipX = true;
    } else if (this._keys.right.isDown) {
      playerVector.x = 1;
      this._player.flipX = false;
    }
    if (this._keys.up.isDown) {
      playerVector.y = -1;
    } else if (this._keys.down.isDown) {
      playerVector.y = 1;
    }

    playerVector.normalize();
    playerVector.scale(this._playerSpeed);

    this._player.setVelocity(playerVector.x, playerVector.y);

    this._background.setTilePosition(
      this.cameras.main.scrollX,
      this.cameras.main.scrollY
    );
  }
}
