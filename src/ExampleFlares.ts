import Phaser from 'phaser';

class Example extends Phaser.Scene {
    preload() {
        this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.atlas('flares', 'https://labs.phaser.io/assets/particles/flares.png', 'https://labs.phaser.io/assets/particles/flares.json');
    }

    create() {
        const wisp = this.add.particles(400, 550, 'flares', {
            frame: 'white',
            tint: { onEmit: () => Phaser.Utils.Array.GetRandom([0x96e0da, 0x937ef3]) },
            lifespan: 1500,
            angle: { min: -100, max: -80 },
            scale: { start: 1, end: 0 },
            speed: { min: 250, max: 350 },
            advance: 2000,
            blendMode: 'SCREEN'
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#fff',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config); 