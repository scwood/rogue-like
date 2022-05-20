import { Game, Scene } from "phaser";
import grassUrl from "./my-grass4.png";
import personUrl from "./person.png";

function preload() {
  this.load.image;
}

class Level1 extends Scene {
  private _player: Phaser.GameObjects.Sprite;
  private _grass: Phaser.GameObjects.TileSprite;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  preload() {
    this.load.image("grass", grassUrl);
    this.load.image("player", personUrl);
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    this._cursors = this.input.keyboard.createCursorKeys();
    // this._player = this.add.sprite(width / 2, height / 2, "player");

    this._grass = this.add.tileSprite(
      width / 2,
      height / 2,
      width,
      height,
      "grass"
    );
    this.add.image(width / 2, height / 2, "player");
  }

  update() {
    const vector = new Phaser.Math.Vector2();
    if (this._cursors.left.isDown) {
      vector.x = -1;
    } else if (this._cursors.right.isDown) {
      vector.x = 1;
    }
    if (this._cursors.up.isDown) {
      vector.y = -1;
    } else if (this._cursors.down.isDown) {
      vector.y = 1;
    }

    // vector.normalize();
    this._grass.tilePositionX += vector.x;
    this._grass.tilePositionY += vector.y;
  }
}

const game = new Game({
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  zoom: 2,
  scale: {
    // mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  scene: [Level1],
  physics: {
    default: "arcade",
    arcade: { debug: true },
  },
});
