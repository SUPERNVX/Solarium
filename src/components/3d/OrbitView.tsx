import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useStore } from '../../store';
import OrbitUI from './OrbitUI';
import SolarSystem3D from './SolarSystem3D';
import CameraController from './CameraController';
import InfoPanel from '../InfoPanel';

export default function OrbitView() {
    const activePlanet = useStore((state) => state.activePlanet);
    const setActivePlanet = useStore((state) => state.setActivePlanet);

    return (
        <div className="absolute inset-0 w-full h-full bg-black">
            <Canvas camera={{ position: [0, 80, 0], fov: 45, far: 10000, near: 0.1 }}>
                <color attach="background" args={['#050505']} />
                
                {/* Basic Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[0, 0, 0]} intensity={100} color="#ffffff" decay={1.5} distance={1000} />

                <Suspense fallback={null}>
                    <SolarSystem3D />
                </Suspense>

                <CameraController />
            </Canvas>

            {/* Overlays / UI */}
            <OrbitUI />

            <InfoPanel 
                planet={activePlanet}
                onClose={() => setActivePlanet(null)}
            />
        </div>
    );
}
