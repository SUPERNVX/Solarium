import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store';
import { getScaledRadius } from '../../physics';

import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export default function CameraController() {
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const { camera, scene } = useThree();
    const activePlanet = useStore(state => state.activePlanet);
    const sizeMode = useStore(state => state.sizeMode);

    const targetPosition = useRef(new THREE.Vector3());
    const cameraIdealPosition = useRef(new THREE.Vector3());
    const isTransitioning = useRef(false);

    useEffect(() => {
        if (activePlanet) {
            isTransitioning.current = true;
        } else {
             // Returning to free roaming overview?
             isTransitioning.current = false;
        }
    }, [activePlanet]);

    useFrame((_state, delta) => {
        if (!controlsRef.current) return;
        
        if (activePlanet && isTransitioning.current) {
            const object = scene.getObjectByName(activePlanet.id);
            if (object) {
                // Get world position of the planet
                object.getWorldPosition(targetPosition.current);

                const currentRadius = getScaledRadius(activePlanet.id, sizeMode);

                // Offset the target slightly to the right so the planet appears on the left
                // Actually the InfoPanel takes the right part of the screen, so the planet should be centered on the left half.
                // It means camera needs to look slightly right of the planet.
                // Or we can physically place the camera such that it points at the planet.
                
                controlsRef.current.target.lerp(targetPosition.current, delta * 4);

                // Ideal camera position: relative to the planet, zoomed in depending on its radius.
                // We want to be slightly "above and front" or "left aligned"
                // Let's just create an offset Vector
                const offsetDistance = currentRadius * 3 + 10;
                
                // Let's position camera roughly pointing at target
                cameraIdealPosition.current.copy(targetPosition.current)
                    .add(new THREE.Vector3(offsetDistance * 0.5, currentRadius, offsetDistance));

                camera.position.lerp(cameraIdealPosition.current, delta * 3);
            }
        } else {
            // When not active, user controls freely.
            // Optional: slow pan if they let go.
        }
    });

    return (
        <OrbitControls 
            ref={controlsRef} 
            enableDamping 
            dampingFactor={0.05} 
            maxDistance={sizeMode === 'real' ? 1600 : 800} 
            minDistance={2}
        />
    );
}
