import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;
  uniform float uTime;

  void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  uniform float uTime;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;
    
    float glow = smoothstep(0.5, 0.0, dist);
    float alpha = smoothstep(0.5, 0.2, dist);
    
    gl_FragColor = vec4(vColor, alpha * 0.8);
  }
`;

const SiriEffect: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const particlesRef = useRef<THREE.Points | null>(null);
    const particleCountRef = useRef(5);
    const colorIntensity = 2;

    const init = () => {
        if (!mountRef.current) return;

        // Limpar recursos anteriores
        if (rendererRef.current) {
            rendererRef.current.dispose();
        }
        if (particlesRef.current) {
            particlesRef.current.geometry.dispose();
            (particlesRef.current.material as THREE.Material).dispose();
        }

        const width = mountRef.current.clientWidth || window.innerWidth;
        const height = mountRef.current.clientHeight || window.innerHeight;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 12;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.innerHTML = '';
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const positions = new Float32Array(particleCountRef.current * 3);
        const colors = new Float32Array(particleCountRef.current * 3);
        const sizes = new Float32Array(particleCountRef.current);

        for (let i = 0; i < particleCountRef.current; i++) {
            const radius = Math.random() * 0.2;
            const theta = Math.random() * Math.PI * 1;
            positions[i * 3] = Math.cos(theta) * radius;
            positions[i * 3 + 1] = Math.sin(theta) * radius;
            positions[i * 3 + 2] = 0;

            const colorStops = [
                new THREE.Color(0x0074ff), // azul médio
                new THREE.Color(0x00c3ff), // azul claro
                new THREE.Color(0x00b28a), // verde-azulado
                new THREE.Color(0x90d65b), // verde-claro
                new THREE.Color(0xe6f590), // verde-amarelado
            ];
            //   const t = Math.random() * (colorStops.length - 1);
            const t = i;
            const idx = Math.floor(t);
            const frac = t - idx;
            const c1 = colorStops[idx];
            const c2 = colorStops[Math.min(idx + 1, colorStops.length - 1)];
            const color = c1.clone().lerp(c2, frac);

            colors[i * 3] = color.r * colorIntensity;
            colors[i * 3 + 1] = color.g * colorIntensity;
            colors[i * 3 + 2] = color.b * colorIntensity;

            sizes[i] = Math.random() * 2 + 1;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uTime: { value: 0 }
            }
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        particlesRef.current = particles;
    };

    useEffect(() => {
        init();

        let start = Date.now();
        const distance = 0.01;
        const speed = 2.1;
        const animate = () => {
            if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;

            const time = (Date.now() - start) * 0.001;
            const material = particlesRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = time;

            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < particleCountRef.current; i++) {
                const i3 = i * 3;
                positions[i3] += Math.sin(time * speed + i) * distance;
                positions[i3 + 1] += Math.cos(time * speed + i) * distance;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;

            rendererRef.current.render(sceneRef.current, cameraRef.current);
            requestRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup function
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            if (particlesRef.current) {
                particlesRef.current.geometry.dispose();
                (particlesRef.current.material as THREE.Material).dispose();
            }
            if (mountRef.current) {
                mountRef.current.innerHTML = '';
            }
        };
    }, []); // Dependência vazia para executar apenas uma vez na montagem

    return (
        <div
            ref={mountRef}
            style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', top: 0, left: 0, zIndex: -1 }}
        />
    );
};

export default SiriEffect; 