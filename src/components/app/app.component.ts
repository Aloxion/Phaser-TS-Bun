// Phaser main app component
// Fill it out for me

import Phaser from "phaser";
import skyImage from "../../../static/assets/sky.png";
import starImage from "../../../static/assets/star.png";
import bombImage from "../../../static/assets/bomb.png";
import platformImage from "../../../static/assets/platform.png";
import dudeImage from "../../../static/assets/dude.png";

export class App extends Phaser.Scene {
    sky: Phaser.GameObjects.Image;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    stars: Phaser.Physics.Arcade.Group;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    bombs: Phaser.Physics.Arcade.Group;
    score = 0;
    scoreText: Phaser.GameObjects.Text;
    gameOver = false;

    constructor() {
        super({ key: "app" });
    }

    preload(this: Phaser.Scene): void {
        this.load.image('sky', skyImage);
        this.load.image('star', starImage);
        this.load.image('bomb', bombImage);
        this.load.image('ground', platformImage);
        this.load.spritesheet('dude', dudeImage, { frameWidth: 32, frameHeight: 48 });
    }

    createAnimations(this: Phaser.Scene): void {
        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    create(): void {
        this.sky = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'sky');
        this.sky.setScale(3);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        // Set animations
        this.createAnimations()

        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child: any): boolean | null {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return null;
        });

        this.bombs = this.physics.add.group();

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.overlap(this.player, this.stars, this.collectStar as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);
    }

    update() {
        if (this.gameOver) {
            return;
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    collectStar(player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Image): void {
        star.disableBody(true, true);

        //  Add and update the score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            this.stars.children.iterate((child): boolean | null => {
                child.body?.gameObject.enableBody(true, child.body.position.x, 0, true, true);
                return null;
            });


            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }

    hitBomb(player: Phaser.Physics.Arcade.Sprite, bomb: Phaser.Physics.Arcade.Image) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }

}


export default App;
