import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';

class NeuronScene extends Phaser.Scene {
    private particles: Phaser.GameObjects.Particles.ParticleEmitter[] = [];

    preload() {
        this.load.image('particle', '/assets/particles-single.png'); // ajuste o caminho se necessário
    }

    constructor() {
        super({ key: 'NeuronScene' });
    }

    create() {
        console.log('Phaser Scene: create called');

        // Centralizar os emissores e ajustar ranges para efeito mais orgânico
        const mainEmitter = this.add.particles(this.cameras.main.width / 2, this.cameras.main.height / 2, 'particle', {
            lifespan: 3000,
            scale: { start: 0.5, end: 0 },
            quantity: 1,
            blendMode: Phaser.BlendModes.SCREEN,
            tint: { onEmit: () => Phaser.Utils.Array.GetRandom([0x0074ff, 0x00c3ff, 0x00b28a]) },
            alpha: { start: 1, end: 0 },
            frequency: 4,
            emitting: true,
            emitZone: {
                type: 'edge',
                source: new Phaser.Geom.Circle(0, 0, 80),
                quantity: 8,
                yoyo: false
            },
            angle: { min: 0, max: 360 },
            speed: 100
        });
        mainEmitter.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        
        const secondaryEmitter = this.add.particles(this.cameras.main.width / 2, this.cameras.main.height / 2, 'particle', {
            lifespan: 2000,
            scale: { start: 0.1, end: 0 },
            quantity: 1,
            blendMode: Phaser.BlendModes.SCREEN,
            tint: { onEmit: () => Phaser.Utils.Array.GetRandom([0x0074ff, 0x00c3ff, 0x00b28a]) },
            alpha: { start: 3.5, end: 0 },
            frequency: 2,
            emitting: true,
            emitZone: {
                type: 'edge',
                source: new Phaser.Geom.Circle(0, 0, 80),
                quantity: 8,
                yoyo: false
            },
            angle: { min: 0, max: 360 },
            speed: 100
        });
        secondaryEmitter.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        // const smokeEmitter = this.add.particles(this.cameras.main.width / 2, this.cameras.main.height / 2, 'particle', {
        //     lifespan: 2000,
        //     scale: { start: 0.85, end: 0.3 },
        //     quantity: 1,
        //     blendMode: 'ADD',
        //     tint: { onEmit: () => Phaser.Utils.Array.GetRandom([0x0074ff, 0x00c3ff, 0x00b28a, 0x90d65b, 0xe6f590]) },
        //     alpha: { start: 0.3, end: 0 },
        //     frequency: 90,
        //     emitting: true,
        //     emitZone: {
        //         type: 'edge',
        //         source: new Phaser.Geom.Circle(0, 0, 80),
        //         quantity: 12,
        //         yoyo: false
        //     },
        //     angle: { min: 0, max: 360 },
        //     speed: 20
        // });
        // smokeEmitter.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        // this.particles = [mainEmitter, secondaryEmitter, smokeEmitter];
        this.particles = [mainEmitter, secondaryEmitter];
    }
}

const NeuronEffect: React.FC = () => {
    const gameRef = useRef<Phaser.Game | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: containerRef.current,
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            backgroundColor: '#222222',
            scene: NeuronScene,
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        };

        gameRef.current = new Phaser.Game(config);

        const handleResize = () => {
            if (gameRef.current) {
                gameRef.current.scale.resize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (gameRef.current) {
                gameRef.current.destroy(true);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1
            }}
        />
    );
};

export default NeuronEffect; 