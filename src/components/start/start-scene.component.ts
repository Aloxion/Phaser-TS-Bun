
import Phaser from "phaser";
import App from "../app/app.component";



export class StartScene extends Phaser.Scene {

    constructor() {
        super({ key: "start" })
    }

    create() {
        const startText = this.add.text(100, 100, 'Start Game', { color: '#0f0' });

        startText.setInteractive({ useHandCursor: true });
        startText.on('pointerup', () => {
            this.scene.start(App.name.toLowerCase());
        });
    }
}

export default StartScene;