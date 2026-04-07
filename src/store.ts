import { create } from 'zustand';
import type { PlanetData } from './constants';

export type ViewMode = 'classic' | 'orbit';
export type ScaleMode = 'real' | 'presentation'; // For Size scaling

interface SolariumState {
    // Navigation state
    currentView: ViewMode;
    setCurrentView: (view: ViewMode) => void;

    // 3D Specific toggles
    speedMode: 'real' | 'slow';
    setSpeedMode: (mode: 'real' | 'slow') => void;
    
    sizeMode: 'real' | 'presentation';
    setSizeMode: (mode: 'real' | 'presentation') => void;

    // Info panel and interactions
    activePlanet: PlanetData | null;
    setActivePlanet: (planet: PlanetData | null) => void;
    
    // We can also sync the chosen planet index for classic mode
    selectedPlanetIndex: number;
    setSelectedPlanetIndex: (index: number) => void;
}

export const useStore = create<SolariumState>((set) => ({
    currentView: 'classic',
    setCurrentView: (view) => set({ currentView: view }),
    
    speedMode: 'real',
    setSpeedMode: (speedMode) => set({ speedMode }),
    
    sizeMode: 'presentation', // Default to visible sizes initially
    setSizeMode: (sizeMode) => set({ sizeMode }),

    activePlanet: null,
    setActivePlanet: (activePlanet) => set({ activePlanet }),

    selectedPlanetIndex: 0,
    setSelectedPlanetIndex: (selectedPlanetIndex) => set({ selectedPlanetIndex }),
}));
