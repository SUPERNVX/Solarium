import { useState } from 'react';
import { PLANETS } from './constants';
import type { PlanetData } from './constants';
import Background from './components/Background';
import Navigation from './components/Navigation';
import Planet from './components/Planet';
import InfoPanel from './components/InfoPanel';

function App() {
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0); // Mercury as default
  const [activeInfoPlanet, setActiveInfoPlanet] = useState<PlanetData | null>(null);

  const handlePlanetSelect = (index: number) => {
    setSelectedPlanetIndex(index);
    setActiveInfoPlanet(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-montserrat select-none">
      {/* Visual background */}
      <Background />

      {/* Main UI Header */}
      <header className="logo uppercase z-50">
        Solar explorer
        <span className="block text-[#f39041] text-[12px]">in React & Tailwind</span>
      </header>

      {/* 3D Scene Container */}
      <div className="absolute inset-0 perspective-container pointer-events-none z-10">
        <div
          className="absolute inset-0 preserve-3d flex items-center justify-center transition-transform duration-[2800ms] ease-[cubic-bezier(0.33,0,0,1)]"
          style={{ transform: 'rotateX(-20deg)' }}
        >
          {PLANETS.map((planet, index) => (
            <Planet
              key={planet.id}
              data={planet}
              index={index}
              selectedIndex={selectedPlanetIndex}
              onReadMore={setActiveInfoPlanet}
            />
          ))}
        </div>
      </div>

      {/* Navigation UI */}
      <Navigation
        selectedIndex={selectedPlanetIndex}
        onSelect={handlePlanetSelect}
      />

      {/* Detailed Info Panel Overlay */}
      <InfoPanel
        planet={activeInfoPlanet}
        onClose={() => setActiveInfoPlanet(null)}
      />
    </div>
  );
}

export default App;
