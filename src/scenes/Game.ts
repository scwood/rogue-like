import Phaser from "phaser";
import { Enemies } from "../characters/Enemies";
import { Skeleton } from "../characters/Skeleton";

import { Wizard } from "../characters/Wizard";

export class Game extends Phaser.Scene {
  private _player: Phaser.Physics.Arcade.Sprite;
  private _playerSpeed = 150;
  private _background: Phaser.GameObjects.TileSprite;
  private _keys: {
    up: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super("game");
  }

  create() {
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

    this._player = new Wizard(this, 0, 0);
    this.cameras.main.startFollow(this._player);
    new Enemies(this, this._player).spawn();
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
