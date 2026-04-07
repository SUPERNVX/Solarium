import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetData } from '../../constants';
import { useStore } from '../../store';
import { getScaledDistance, getScaledRadius, PHYSICS_DATA } from '../../physics';

export default function CelestialBody({ planetData, childrenData }: { planetData: PlanetData, childrenData?: PlanetData }) {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    
    const texture = useTexture(planetData.textureUrl, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
    });


    const { speedMode, sizeMode, activePlanet, setActivePlanet } = useStore();

    // Base orbit rotation angle
    const [initialAngle] = useState(() => Math.random() * Math.PI * 2);
    const orbitAngle = useRef(initialAngle);

    const phys = PHYSICS_DATA[planetData.id];

    useFrame((_state, delta) => {
        if (!groupRef.current || !meshRef.current) return;
        
        // Speed logic
        const speedMultiplier = speedMode === 'slow' ? 0.1 : 1.0;
        // Real relative angular speed
        const angularSpeed = phys && phys.orbitPeriodYears ? (1 / phys.orbitPeriodYears) * speedMultiplier * delta : 0;
        
        if (planetData.id !== 'sun') {
             orbitAngle.current += angularSpeed;
             const distance = getScaledDistance(planetData.id, sizeMode);
             
             // Update position
             groupRef.current.position.x = Math.cos(orbitAngle.current) * distance;
             groupRef.current.position.z = Math.sin(orbitAngle.current) * distance;
             
             // The group holds the mesh + label + children
        }

        // Rotation logic
        const rotMultiplier = speedMode === 'slow' ? 0.5 : 1.5;
        const rotateSpeed = phys && phys.rotationPeriodDays ? (1 / phys.rotationPeriodDays) * rotMultiplier * delta : delta;
        meshRef.current.rotation.y += rotateSpeed;
    });

    const radius = useMemo(() => getScaledRadius(planetData.id, sizeMode), [planetData.id, sizeMode]);


    // Orbit Ring Geometry
    const orbitRingPts = useMemo(() => {
        if (planetData.id === 'sun') return null;
        const pts = [];
        const distance = getScaledDistance(planetData.id, sizeMode);
        for(let i=0; i<=64; i++) {
            const a = (i/64)*Math.PI*2;
            pts.push(new THREE.Vector3(Math.cos(a)*distance, 0, Math.sin(a)*distance));
        }
        return pts;
    }, [planetData.id, sizeMode]);

    return (
        <>
            {orbitRingPts && (
                <Line points={orbitRingPts} color={planetData.color} transparent opacity={0.3} lineWidth={1.5} />
            )}

            <group ref={groupRef} name={planetData.id}>
                {/* Planet Mesh */}
                <mesh 
                    ref={meshRef} 
                    onClick={(e) => { e.stopPropagation(); setActivePlanet(planetData); }}
                    onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; }}
                >
                    <sphereGeometry args={[radius, 64, 64]} />
                    {planetData.id === 'sun' ? (
                        <meshBasicMaterial map={texture} color="#ffffee" />
                    ) : (
                        <meshStandardMaterial map={texture} roughness={0.6} metalness={0.1} />
                    )}
                </mesh>

                {/* Sun Glow */}
                {planetData.id === 'sun' && (
                    <mesh>
                        <sphereGeometry args={[radius * 1.2, 32, 32]} />
                        <meshBasicMaterial color={planetData.glowColor} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
                    </mesh>
                )}

                {/* Html Label */}
                <Html 
                    position={[0, radius + (sizeMode === 'presentation'? 1 : 0.2), 0]} 
                    center
                    distanceFactor={40} // relative scaling
                    zIndexRange={[100, 0]}
                    className={`transition-opacity duration-300 ${activePlanet ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    style={{ pointerEvents: 'none' }}
                >
                    <div className="flex flex-col items-center">
                        <div className="w-1 h-4 bg-white/20 mb-1" style={{ backgroundColor: planetData.color }}></div>
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md whitespace-nowrap" style={{ color: planetData.color, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                            {planetData.name}
                        </span>
                    </div>
                </Html>

                {/* Moon logic (attached to Earth) */}
                {childrenData && (
                     <Moon sizeMode={sizeMode} parentRadius={radius} moonData={childrenData} />
                )}

            </group>
        </>
    );
}

interface MoonProps {
    sizeMode: 'real' | 'presentation';
    parentRadius: number;
    moonData: PlanetData;
}

function Moon({ sizeMode, parentRadius, moonData }: MoonProps) {
    const moonRef = useRef<THREE.Mesh>(null);
    const moonPhys = PHYSICS_DATA[moonData.id];
    const texture = useTexture(moonData.textureUrl, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
    });
    
    useFrame((state, delta) => {
        if (!moonRef.current) return;
        const time = state.clock.elapsedTime * (1 / moonPhys.orbitPeriodYears);
        const dist = parentRadius * 1.5 + (sizeMode === 'real' ? 5 : 2); 
        moonRef.current.position.x = Math.cos(time) * dist;
        moonRef.current.position.z = Math.sin(time) * dist;
        moonRef.current.rotation.y += delta;
    });

    const mRadius = getScaledRadius(moonData.id, sizeMode);

    return (
        <group>
           <mesh ref={moonRef}>
               <sphereGeometry args={[mRadius, 32, 32]} />
               <meshStandardMaterial map={texture} roughness={0.8} />
           </mesh>
        </group>
    );
}
