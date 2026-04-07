import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { PLANETS } from '../../constants';
import CelestialBody from './CelestialBody';

import * as THREE from 'three';

export default function SolarSystem3D() {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame(() => {
    });

    // The Moon should be attached to Earth. We will handle Moon inside Earth's CelestialBody or pass it specially.
    // For simplicity, we can render the Sun and Planets, and for Earth, we render its Moon relatively.

    const mainBodies = PLANETS.filter(p => p.bodyType !== 'moon');
    const moon = PLANETS.find(p => p.id === 'moon');

    return (
        <group ref={groupRef}>
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {mainBodies.map((planet) => (
                <CelestialBody 
                    key={planet.id} 
                    planetData={planet} 
                    childrenData={planet.id === 'earth' ? moon : undefined} 
                />
            ))}
        </group>
    );
}
