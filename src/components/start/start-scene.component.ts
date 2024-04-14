
import Phaser from "phaser";



export class StartScene extends Phaser.Scene {

    constructor() {
        super({ key: "start" })
    }

    create() {
        const startText = this.add.text(100, 100, 'Start Game', { color: '#0f0' });

        startText.setInteractive({ useHandCursor: true });
        startText.on('pointerup', () => {
            this.scene.start('app');
        });
    }
}

export default StartScene;