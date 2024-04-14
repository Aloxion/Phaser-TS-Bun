// Index file for phase ts with bun package manager
import Phaser from "phaser";
import App from "./src/components/app/app.component";
import StartScene from "./src/components/start/start-scene.component";

var config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300, x: 0 },
            debug: false
        }
    },
    scene: [StartScene, App]
};

let game = new Phaser.Game(config);
game.scene.start(StartScene.name.toLowerCase());


export default game;