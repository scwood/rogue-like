import Phaser from "phaser";

import { Preloader } from "./scenes/Preloader";
import { Game } from "./scenes/Game";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  zoom: 2,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  roundPixels: false,
  scene: [Preloader, Game],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
});
