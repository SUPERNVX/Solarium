/* eslint-disable */
import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../../../store';
import PostProcessingLensing from '../PostProcessingLensing';

const CORE_RADIUS = 1.2;
const CRUST_RADIUS = 1.23;

export default function Magnetar() {
    const { celestialRotation, magnetarParams, setMagnetarParams } = useStore();
    const { fieldStrength, rotationSpeed, jetIntensity, layer, flareIntensity } = magnetarParams;

    const starRef = useRef<THREE.Group>(null);
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const crustRef = useRef<THREE.Mesh>(null);
    const poloidalParticlesRef = useRef<THREE.Points>(null);
    const toroidalParticlesRef = useRef<THREE.Points>(null);
    const jetParticlesRef = useRef<THREE.Points>(null);
    const flareRef = useRef<THREE.Mesh>(null);

    const [currentFlare, setCurrentFlare] = useState(0);

    // Magnetic field parameters
    const numPoloidal = 2000;
    const numToroidal = 1000;
    const numJet = 1500;

    // Initialize Poloidal Particles data
    const poloidalData = useMemo(() => {
        const positions = new Float32Array(numPoloidal * 3);
        const colors = new Float32Array(numPoloidal * 3);
        const info = [];
        const loops = 24;
        const particlesPerLoop = Math.floor(numPoloidal / loops);

        let pIdx = 0;
        for (let i = 0; i < loops; i++) {
            const phi = (i / loops) * Math.PI * 2;
            const L = 3.5 + Math.random() * 4.5; // Increased from 2.5 + 3.5
            for (let j = 0; j < particlesPerLoop; j++) {
                const progress = Math.random();
                const speed = 0.05 + Math.random() * 0.1;
                info.push({ phi, L, progress, speed });
                positions[pIdx * 3] = 0; positions[pIdx * 3 + 1] = 0; positions[pIdx * 3 + 2] = 0;
                colors[pIdx * 3] = 0.2 + Math.random() * 0.2;
                colors[pIdx * 3 + 1] = 0.6 + Math.random() * 0.4;
                colors[pIdx * 3 + 2] = 1.0;
                pIdx++;
            }
        }
        return { positions, colors, info };
    }, [numPoloidal]);

    // Initialize Toroidal Particles data
    const toroidalData = useMemo(() => {
        const positions = new Float32Array(numToroidal * 3);
        const colors = new Float32Array(numToroidal * 3);
        const info: any[] = [];
        const bands = 8;
        const particlesPerBand = Math.floor(numToroidal / bands);

        let pIdx = 0;
        for (let i = 0; i < bands; i++) {
            const yLevel = (Math.random() - 0.5) * 2.5; // Increased height
            const L = 1.8 + Math.random() * 1.8; // Increased from 1.2 + 1.2
            for (let j = 0; j < particlesPerBand; j++) {
                const progress = Math.random();
                const speed = 0.1 + Math.random() * 0.1;
                info.push({ yLevel, L, progress, speed });
                positions[pIdx * 3] = 0; positions[pIdx * 3 + 1] = 0; positions[pIdx * 3 + 2] = 0;
                colors[pIdx * 3] = 1.0;
                colors[pIdx * 3 + 1] = 0.1 + Math.random() * 0.3;
                colors[pIdx * 3 + 2] = 0.5 + Math.random() * 0.5;
                pIdx++;
            }
        }
        return { positions, colors, info };
    }, [numToroidal]);

    // Relativistic Jets Particles
    const jetData = useMemo(() => {
        const positions = new Float32Array(numJet * 3);
        const colors = new Float32Array(numJet * 3);
        const info: any[] = [];

        for (let i = 0; i < numJet; i++) {
            const direction = Math.random() > 0.5 ? 1 : -1;
            const height = Math.random() * 10;
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.0 + Math.random() * 1.5;
            info.push({ direction, height, angle, speed });
            positions[i * 3] = 0; positions[i * 3 + 1] = 0; positions[i * 3 + 2] = 0;
            colors[i * 3] = 0.8 + Math.random() * 0.2;
            colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
            colors[i * 3 + 2] = 1.0;
        }
        return { positions, colors, info };
    }, [numJet]);

    useEffect(() => {
        if (flareIntensity > 0) {
            setCurrentFlare(flareIntensity);
        }
    }, [flareIntensity]);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const rot = rotationSpeed * delta;

        if (groupRef.current) {
            // Apply Solarium global rotation + local Magnetar spin
            groupRef.current.rotation.x = celestialRotation.x;
            groupRef.current.rotation.y += rot;
        }

        if (coreRef.current) {
            const pulse = 1.0 + Math.sin(time * 10) * 0.02;
            coreRef.current.scale.set(pulse, pulse, pulse);
        }

        // Update Poloidal
        if (poloidalParticlesRef.current && (layer === "all" || layer === "magnetic")) {
            const positions = poloidalParticlesRef.current.geometry.attributes.position.array as Float32Array;
            const info = poloidalData.info;
            for (let i = 0; i < info.length; i++) {
                const item = info[i];
                item.progress += item.speed * delta * (fieldStrength / 5);
                if (item.progress > 1) item.progress = 0;
                const theta = item.progress * Math.PI;
                const currentL = item.L * (0.5 + fieldStrength / 10);
                const r = currentL * Math.sin(theta) * Math.sin(theta);
                positions[i * 3] = r * Math.sin(theta) * Math.cos(item.phi);
                positions[i * 3 + 1] = r * Math.cos(theta);
                positions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(item.phi);
            }
            poloidalParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Update Toroidal
        if (toroidalParticlesRef.current && (layer === "all" || layer === "magnetic")) {
            const positions = toroidalParticlesRef.current.geometry.attributes.position.array as Float32Array;
            const info = toroidalData.info;
            for (let i = 0; i < info.length; i++) {
                const item = info[i];
                item.progress += item.speed * delta * (fieldStrength / 5);
                if (item.progress > 1) item.progress = 0;
                const alpha = item.progress * Math.PI * 2;
                const currentL = item.L * (0.5 + fieldStrength / 10);
                positions[i * 3] = currentL * Math.cos(alpha);
                positions[i * 3 + 1] = item.yLevel;
                positions[i * 3 + 2] = currentL * Math.sin(alpha);
            }
            toroidalParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Update Jets
        if (jetParticlesRef.current && (layer === "all" || layer === "core")) {
            const positions = jetParticlesRef.current.geometry.attributes.position.array as Float32Array;
            const info = jetData.info;
            for (let i = 0; i < info.length; i++) {
                const item = info[i];
                item.height += item.speed * delta * (jetIntensity + 1);
                if (item.height > 15) item.height = 0.5;
                const spread = 0.05 * item.height;
                positions[i * 3] = Math.cos(item.angle) * spread;
                positions[i * 3 + 1] = item.height * item.direction;
                positions[i * 3 + 2] = Math.sin(item.angle) * spread;
            }
            jetParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Flare expansion
        if (flareRef.current) {
            if (currentFlare > 0) {
                flareRef.current.scale.addScalar(delta * 40);
                if (flareRef.current.scale.x > 60) {
                    setCurrentFlare(0);
                    setMagnetarParams({ flareIntensity: 0 });
                    flareRef.current.scale.set(0.1, 0.1, 0.1);
                }
            }
        }
    });

    return (
        <group ref={groupRef}>
            <group ref={starRef}>
                {/* Core */}
                {(layer === "all" || layer === "core") && (
                    <mesh ref={coreRef} frustumCulled={false}>
                        <sphereGeometry args={[CORE_RADIUS, 64, 64]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={1} />
                    </mesh>
                )}

                {/* Crust */}
                {(layer === "all" || layer === "crust") && (
                    <mesh ref={crustRef} frustumCulled={false}>
                        <sphereGeometry args={[CRUST_RADIUS, 64, 64]} />
                        <meshStandardMaterial
                            color="#1a0b2e"
                            emissive="#ff33aa"
                            emissiveIntensity={currentFlare > 0 ? currentFlare * 5 : 0.4}
                            wireframe={layer === "crust"}
                            transparent
                            opacity={0.85}
                        />
                    </mesh>
                )}

                {/* Poloidal Particles */}
                {(layer === "all" || layer === "magnetic") && (
                    <points ref={poloidalParticlesRef} frustumCulled={false}>
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" args={[poloidalData.positions, 3]} />
                            <bufferAttribute attach="attributes-color" args={[poloidalData.colors, 3]} />
                        </bufferGeometry>
                        <pointsMaterial size={0.20} vertexColors transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </points>
                )}

                {/* Toroidal Particles */}
                {(layer === "all" || layer === "magnetic") && (
                    <points ref={toroidalParticlesRef} frustumCulled={false}>
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" args={[toroidalData.positions, 3]} />
                            <bufferAttribute attach="attributes-color" args={[toroidalData.colors, 3]} />
                        </bufferGeometry>
                        <pointsMaterial size={0.18} vertexColors transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </points>
                )}

                {/* Jet Particles */}
                {(layer === "all" || layer === "core") && (
                    <points ref={jetParticlesRef} frustumCulled={false}>
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" args={[jetData.positions, 3]} />
                            <bufferAttribute attach="attributes-color" args={[jetData.colors, 3]} />
                        </bufferGeometry>
                        <pointsMaterial size={0.25} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </points>
                )}

                {/* Energy Ring */}
                {layer === "all" && (
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[2.5, 5.5, 64]} />
                        <meshBasicMaterial color="#ff0077" side={THREE.DoubleSide} transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </mesh>
                )}
            </group>

            {/* Flare Shockwave */}
            <mesh ref={flareRef} scale={[0.1, 0.1, 0.1]} frustumCulled={false}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#ff0077" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>

            <PostProcessingLensing targetRef={starRef} />
        </group>
    );
}
