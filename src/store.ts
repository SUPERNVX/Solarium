import { create } from 'zustand';
import type { PlanetData } from './constants';

export type ViewMode = 'classic' | 'orbit' | 'celestial';
export type ScaleMode = 'real' | 'presentation'; // For Size scaling

interface SolariumState {
    // Navigation state
    currentView: ViewMode;
    setCurrentView: (view: ViewMode) => void;

    // 3D Specific toggles
    speedMode: 'real' | 'slow';
    setSpeedMode: (mode: 'real' | 'slow') => void;

    scaleMode: 'stretched' | 'distance' | 'size';
    setScaleMode: (mode: 'stretched' | 'distance' | 'size') => void;

    projectionMode: '2D' | '3D';
    setProjectionMode: (mode: '2D' | '3D') => void;

    zoomLevel: 'large' | 'close';
    setZoomLevel: (level: 'large' | 'close') => void;

    distanceMode: 'real' | 'presentation';
    setDistanceMode: (mode: 'real' | 'presentation') => void;

    sizeMode: ScaleMode;
    setSizeMode: (mode: ScaleMode) => void;

    isLinear: boolean;
    setIsLinear: (isLinear: boolean) => void;

    // Info panel and interactions
    activePlanet: PlanetData | null;
    setActivePlanet: (planet: PlanetData | null) => void;

    // We can also sync the chosen planet index for classic mode
    selectedPlanetIndex: number;
    setSelectedPlanetIndex: (index: number) => void;

    // Celestial Bodies specific
    activeCelestialIndex: number;
    setActiveCelestialIndex: (index: number) => void;

    celestialRotation: { x: number, y: number };
    setCelestialRotation: (rotation: { x: number, y: number }) => void;

    // Magnetar specific
    magnetarParams: {
        fieldStrength: number;
        rotationSpeed: number;
        jetIntensity: number;
        layer: 'all' | 'core' | 'magnetic' | 'crust';
        flareIntensity: number;
    };
    setMagnetarParams: (params: Partial<SolariumState['magnetarParams']>) => void;
    
    // Pulsar specific
    pulsarParams: {
        rotationSpeed: number;
        tiltAngle: number;
        theme: 'blue' | 'purple' | 'red' | 'green';
    };
    setPulsarParams: (params: Partial<SolariumState['pulsarParams']>) => void;
}

export const useStore = create<SolariumState>((set) => ({
    currentView: 'classic',
    setCurrentView: (view) => set({ currentView: view }),

    speedMode: 'real',
    setSpeedMode: (speedMode) => set({ speedMode }),

    scaleMode: 'stretched',
    setScaleMode: (scaleMode) => set({ scaleMode }),

    projectionMode: '3D',
    setProjectionMode: (projectionMode) => set({ projectionMode }),

    zoomLevel: 'large',
    setZoomLevel: (zoomLevel) => set({ zoomLevel }),

    distanceMode: 'presentation',
    setDistanceMode: (distanceMode) => set({ distanceMode }),

    sizeMode: 'presentation',
    setSizeMode: (sizeMode) => set({ sizeMode }),

    isLinear: false,
    setIsLinear: (isLinear) => set({ isLinear }),

    activePlanet: null,
    setActivePlanet: (activePlanet) => set({ activePlanet }),

    selectedPlanetIndex: 0,
    setSelectedPlanetIndex: (selectedPlanetIndex) => set({ selectedPlanetIndex }),

    activeCelestialIndex: 0,
    setActiveCelestialIndex: (activeCelestialIndex) => set({ activeCelestialIndex }),

    celestialRotation: { x: -0.470, y: -2.490 },
    setCelestialRotation: (celestialRotation) => set({ celestialRotation }),

    magnetarParams: {
        fieldStrength: 5,
        rotationSpeed: 1,
        jetIntensity: 2,
        layer: 'all',
        flareIntensity: 0
    },
    setMagnetarParams: (params) => set((state) => ({
        magnetarParams: { ...state.magnetarParams, ...params }
    })),
    
    pulsarParams: {
        rotationSpeed: 4,
        tiltAngle: 45,
        theme: 'blue'
    },
    setPulsarParams: (params) => set((state) => ({
        pulsarParams: { ...state.pulsarParams, ...params }
    })),
}));
