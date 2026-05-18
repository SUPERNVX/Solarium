import { Suspense } from 'react';
import { useStore } from '../../../store';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { CELESTIAL_BODIES } from '../../../data/celestialBodies';
import CelestialUI from './CelestialUI';
import SpacetimeGrid from './SpacetimeGrid';

// Imports dos Corpos Celestes
import RedGiant from './bodies/RedGiant';
import J1407b from './bodies/J1407b';
import WhiteDwarf from './bodies/WhiteDwarf';
import NeutronStar from './bodies/NeutronStar';
import Pulsar from './bodies/Pulsar';
import Magnetar from './bodies/Magnetar';
import BlackHole from './bodies/BlackHole';
import SupermassiveBlackHole from './bodies/SupermassiveBlackHole';
import Quasar from './bodies/Quasar';

const BodyComponents: Record<string, React.FC> = {
    RedGiant,
    J1407b,
    WhiteDwarf,
    NeutronStar,
    Pulsar,
    Magnetar,
    BlackHole,
    SupermassiveBlackHole,
    Quasar
};

export default function CelestialView() {
    const { activeCelestialIndex } = useStore();
    const body = CELESTIAL_BODIES[activeCelestialIndex];
    const ActiveBodyComponent = BodyComponents[body.componentId];

    return (
        <div className="absolute inset-0 w-full h-full bg-black">
            <Canvas camera={{ position: [0, 5, 15], fov: 45, far: 2000 }}>
                <color attach="background" args={['#020104']} />
                <fog attach="fog" args={['#020104', 10, 300]} />

                <SpacetimeGrid />
                <Suspense fallback={null}>
                    {ActiveBodyComponent && <ActiveBodyComponent />}
                </Suspense>

                <OrbitControls
                    enableDamping
                    dampingFactor={0.035}
                    enableRotate={false}
                    enablePan={false}
                    minDistance={2.5}
                    maxDistance={100}
                />
            </Canvas>

            <CelestialUI />
        </div>
    );
}
