import { useStore } from '../../../store';
import { CELESTIAL_BODIES } from '../../../data/celestialBodies';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MagnetarDashboard from './MagnetarDashboard';
import PulsarDashboard from './PulsarDashboard';

export default function CelestialUI() {
    const { activeCelestialIndex, setActiveCelestialIndex, setActivePlanet } = useStore();
    
    const body = CELESTIAL_BODIES[activeCelestialIndex];

    const handleNext = () => {
        setActiveCelestialIndex((activeCelestialIndex + 1) % CELESTIAL_BODIES.length);
    };

    const handlePrev = () => {
        setActiveCelestialIndex((activeCelestialIndex - 1 + CELESTIAL_BODIES.length) % CELESTIAL_BODIES.length);
    };

    return (
        <>
            {/* Magnetar Dashboard */}
            {body.id === 'magnetar' && <MagnetarDashboard />}
            
            {/* Pulsar Dashboard */}
            {body.id === 'pulsar' && <PulsarDashboard />}

            {/* Slider Controls */}
            <div className="absolute inset-y-0 w-full flex items-center justify-between px-8 pointer-events-none z-20">
                <button 
                    onClick={handlePrev}
                    className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm border border-white/10"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={handleNext}
                    className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm border border-white/10"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Info Overlay (Left/Right depending on preference, putting it on right) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 p-8 pointer-events-none z-20">
                <h1 className="text-5xl font-light text-white mb-2 font-montserrat tracking-wide" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                    {body.name}
                </h1>
                
                <div className="w-12 h-[2px] bg-[#f39041] mb-6 shadow-[0_0_10px_#f39041]"></div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-8 opacity-90 drop-shadow-lg">
                    {body.briefDescription}
                </p>

                <button 
                    onClick={() => setActivePlanet(body)}
                    className="pointer-events-auto px-6 py-2 border border-white/30 text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                >
                    Leia Mais
                </button>
            </div>
        </>
    );
}
