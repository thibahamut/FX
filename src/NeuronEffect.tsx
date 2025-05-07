import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';

class NeuronScene extends Phaser.Scene {
    private particles: any;

    preload() {
        this.load.image('particle', '/assets/particles-single.png');
    }

    create() {
        this.particles = this.add.particles('particle');
    }

    update(time: number) {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const numParticles = 40;
        const baseRadius = 60 + Math.sin(time * 0.001) * 20;
        const tints = [0x00c3ff, 0x0074ff, 0x00b28a];

        for (let i = 0; i < numParticles; i++) {
            const angle = (i / numParticles) * Math.PI * 2;
            const wave = Math.sin(time * 0.002 + angle * 3 + Math.sin(time * 0.001 + i)) * 30;
            const x = centerX + Math.cos(angle) * (baseRadius + wave);
            const y = centerY + Math.sin(angle) * (baseRadius + wave);

            this.particles.emitParticleAt(x, y, {
                lifespan: 1800,
                scale: { start: 1.2, end: 0 },
                blendMode: Phaser.BlendModes.SCREEN,
                alpha: { start: 1, end: 0 },
                tint: tints[i % tints.length],
            });
        }
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