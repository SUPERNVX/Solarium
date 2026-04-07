import { PLANETS } from './constants';
import Background from './components/Background';
import Navigation from './components/Navigation';
import Planet from './components/Planet';
import InfoPanel from './components/InfoPanel';
import TopNav from './components/TopNav';
import OrbitView from './components/3d/OrbitView';
import { useStore } from './store';

function App() {
  const { currentView, activePlanet, setActivePlanet, selectedPlanetIndex, setSelectedPlanetIndex } = useStore();

  const handlePlanetSelect = (index: number) => {
    setSelectedPlanetIndex(index);
    setActivePlanet(null);
  };

  const isInfoOpen = activePlanet !== null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-montserrat select-none">
      {/* Background for Classic view only (OrbitView has its own Canvas background) */}
      {currentView === 'classic' && <Background />}

      {/* Main UI Header / Navigation */}
      <TopNav />

      {currentView === 'classic' ? (
        <>
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
                  isInfoOpen={isInfoOpen}
                  onReadMore={setActivePlanet}
                />
              ))}
            </div>
          </div>

          {/* Navigation UI */}
          <Navigation
            selectedIndex={selectedPlanetIndex}
            onSelect={handlePlanetSelect}
          />
        </>
      ) : (
        <OrbitView />
      )}

      {/* Detailed Info Panel */}
      <InfoPanel
        planet={activePlanet}
        onClose={() => setActivePlanet(null)}
      />
    </div>
  );
}

export default App;
