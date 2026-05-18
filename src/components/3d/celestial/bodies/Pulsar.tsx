import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../../../store';
import PostProcessingLensing from '../PostProcessingLensing';

export default function Pulsar() {
    const { pulsarParams, celestialRotation } = useStore();
    const { rotationSpeed, tiltAngle, theme } = pulsarParams;

    const pulsarGroupRef = useRef<THREE.Group>(null);
    const starRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    const themes = {
        blue: { color: "#4488ff", beamColor: "#88bbff" },
        purple: { color: "#aa44ff", beamColor: "#d488ff" },
        red: { color: "#ff4444", beamColor: "#ff8888" },
        green: { color: "#44ff88", beamColor: "#88ffbb" },
    };

    const { color, beamColor } = themes[theme];
    const tiltAngleRad = (tiltAngle * Math.PI) / 180;

    useFrame((state, delta) => {
        if (pulsarGroupRef.current) {
            // Apply Solarium global rotation + Rapid local rotation
            pulsarGroupRef.current.rotation.x = celestialRotation.x;
            pulsarGroupRef.current.rotation.y += delta * rotationSpeed;
        }
        if (coreRef.current) {
            // Slight pulsating scale effect on the core
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.02;
            coreRef.current.scale.set(pulse, pulse, pulse);
        }
    });

    return (
        <group ref={pulsarGroupRef}>
            {/* Central Neutron Star */}
            <mesh ref={starRef}>
                <Sphere ref={coreRef} args={[1.0, 64, 64]} frustumCulled={false}>
                    <MeshDistortMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={3}
                        distort={0.1}
                        speed={4}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </mesh>

            {/* Outer energy aura */}
            <Sphere args={[1.2, 32, 32]} frustumCulled={false}>
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                    depthWrite={false}
                />
            </Sphere>

            {/* Tilted Magnetic Axis and Beams */}
            <group rotation={[0, 0, tiltAngleRad]}>
                
                {/* Magnetic field / Equator ring representing intense energy */}
                <mesh rotation={[Math.PI / 2, 0, 0]} frustumCulled={false}>
                    <torusGeometry args={[2.5, 0.04, 16, 100]} />
                    <meshBasicMaterial 
                        color={beamColor} 
                        transparent 
                        opacity={0.6} 
                        blending={THREE.AdditiveBlending} 
                    />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]} frustumCulled={false}>
                    <torusGeometry args={[3, 0.02, 16, 100]} />
                    <meshBasicMaterial 
                        color={color} 
                        transparent 
                        opacity={0.3} 
                        blending={THREE.AdditiveBlending} 
                    />
                </mesh>

                {/* Top Beam */}
                <group position={[0, 10, 0]}>
                    <mesh frustumCulled={false}>
                        <cylinderGeometry args={[4.5, 0.2, 20, 32, 1, true]} />
                        <meshBasicMaterial
                            color={beamColor}
                            transparent
                            opacity={0.25}
                            blending={THREE.AdditiveBlending}
                            side={THREE.DoubleSide}
                            depthWrite={false}
                        />
                    </mesh>
                    <mesh frustumCulled={false}>
                        <cylinderGeometry args={[0.8, 0.05, 20, 32, 1, true]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            transparent
                            opacity={0.7}
                            blending={THREE.AdditiveBlending}
                            side={THREE.DoubleSide}
                            depthWrite={false}
                        />
                    </mesh>
                </group>

                {/* Bottom Beam */}
                <group position={[0, -10, 0]}>
                    <mesh frustumCulled={false}>
                        <cylinderGeometry args={[0.2, 4.5, 20, 32, 1, true]} />
                        <meshBasicMaterial
                            color={beamColor}
                            transparent
                            opacity={0.25}
                            blending={THREE.AdditiveBlending}
                            side={THREE.DoubleSide}
                            depthWrite={false}
                        />
                    </mesh>
                    <mesh frustumCulled={false}>
                        <cylinderGeometry args={[0.05, 0.8, 20, 32, 1, true]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            transparent
                            opacity={0.7}
                            blending={THREE.AdditiveBlending}
                            side={THREE.DoubleSide}
                            depthWrite={false}
                        />
                    </mesh>
                </group>
            </group>

            <PostProcessingLensing targetRef={starRef} />
        </group>
    );
}
