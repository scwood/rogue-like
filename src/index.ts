import Phaser from "phaser";

import { MainScene } from "./MainScene";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  zoom: 2,
  pixelArt: true,
  roundPixels: false,
  scene: [MainScene],
  physics: {
    default: "arcade",
  },
});
