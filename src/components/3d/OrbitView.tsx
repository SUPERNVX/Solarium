import React, { useEffect } from 'react';
import { useStore } from '../../store';
import { PLANETS, type PlanetData } from '../../constants';
import { cn } from '../../lib/utils';
import './OrbitView.css';

const ORBITAL_PERIODS: Record<string, number> = {
    mercury: 2.89016,
    venus: 7.38237,
    earth: 12.00021,
    moon: 0.89764,
    mars: 22.57017,
    ceres: 55.2,
    jupiter: 142.35138,
    saturn: 353.36998,
    uranus: 1008.20215,
    neptune: 1977.49584,
    pluto: 2976,
    haumea: 3420,
    makemake: 3660,
    eris: 6684
};

const PLANET_DATA_OVERLAYS: Record<string, { speed: string; size: string; distance: string }> = {
    mercury: { speed: '47.87 km/s', size: '15,329 km', distance: '57,910,000 km' },
    venus: { speed: '35.02 km/s', size: '38,025 km', distance: '108,200,000 km' },
    earth: { speed: '29.78 km/s', size: '40,075 km', distance: '149,600,000 km' },
    mars: { speed: '24.077 km/s', size: '21,344 km', distance: '227,940,000 km' },
    ceres: { speed: '17.90 km/s', size: '2,991 km', distance: '413,700,000 km' },
    jupiter: { speed: '13.07 km/s', size: '439,264 km', distance: '778,330,000 km' },
    saturn: { speed: '9.69 km/s', size: '378,675 km', distance: '1,429,400,000 km' },
    uranus: { speed: '6.81 km/s', size: '160,590 km', distance: '2,870,990,000 km' },
    neptune: { speed: '5.43 km/s', size: '155,600 km', distance: '4,504,300,000 km' },
    pluto: { speed: '4.67 km/s', size: '7,466 km', distance: '5,906,380,000 km' },
    haumea: { speed: '4.48 km/s', size: '5,466 km', distance: '6,450,000,000 km' },
    makemake: { speed: '4.41 km/s', size: '4,500 km', distance: '6,850,000,000 km' },
    eris: { speed: '3.43 km/s', size: '7,500 km', distance: '10,120,000,000 km' },
};

const OrbitView: React.FC = () => {
    const {
        projectionMode,
        setProjectionMode,
        zoomLevel,
        setZoomLevel,
        speedMode,
        setSpeedMode,
        scaleMode,
        setScaleMode,
        isLinear,
        setIsLinear,
        activePlanet,
        setActivePlanet
    } = useStore();

    const [zoomScale, setZoomScale] = React.useState(1);

    const handleWheel = (e: React.WheelEvent) => {
        setZoomScale(prev => {
            const zoomSpeed = 0.15;
            const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
            // Relative zoom: multiply by (1 + delta)
            const newScale = prev * (1 + delta);
            // Clamp between 0.1x and 15x
            return Math.min(Math.max(newScale, 0.1), 15);
        });
    };

    // Determine what to show in dd
    const getOverlayValue = (planetId: string) => {
        const data = PLANET_DATA_OVERLAYS[planetId];
        if (!data) return '';
        if (speedMode === 'real') return data.speed;
        if (scaleMode === 'size') return data.size;
        return data.distance;
    };

    const getOverlayLabel = () => {
        if (speedMode === 'real') return 'Velocidade Orbital';
        if (scaleMode === 'size') return 'Circunferência Equatorial';
        return 'Distância do Sol';
    };

    useEffect(() => {
        // Initial setup if needed
    }, []);

    const handlePlanetClick = (planet: PlanetData, e: React.MouseEvent) => {
        e.stopPropagation();
        setActivePlanet(planet);
    };

    const handleSunClick = () => {
        setActivePlanet(PLANETS.find(p => p.id === 'sun') || null);
    };

    const containerClasses = cn(
        'solar-system-container',
        projectionMode === '3D' ? 'view-3D' : 'view-2D',
        zoomLevel === 'large' ? 'zoom-large' : 'zoom-close',
        scaleMode === 'stretched' ? 'scale-stretched' : scaleMode === 'distance' ? 'scale-d' : 'scale-s',
        activePlanet ? 'planet-selection-active' : '',
        isLinear && 'linear'
    );

    return (
        <div className={containerClasses} onWheel={handleWheel}>
            {/* UI Overlays */}
            <div id="navbar" className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-12 py-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="pointer-events-auto">
                    <h1 className="text-white font-bold text-2xl tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        SOLARIUM <span className="font-extralight text-white/40">EXPLORER</span>
                    </h1>
                </div>
                <div className="pointer-events-auto flex items-center gap-6 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Sistema Orbital V2</span>
                    <div className="h-4 w-px bg-white/10" />
                    <button 
                        onClick={() => {
                            setActivePlanet(null);
                            setZoomScale(1);
                        }}
                        className="text-[10px] text-white/60 hover:text-white transition-colors uppercase tracking-widest font-bold"
                    >
                        Resetar Vista
                    </button>
                </div>
            </div>

            {/* Side Controls */}
            <div id="controls" className="fixed right-8 top-32 z-[100] flex flex-col gap-6 bg-black/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/5 shadow-2xl">
                <ControlGroup label="PERSPECTIVA">
                    <ToggleButton 
                        active={projectionMode === '3D'} 
                        onClick={() => setProjectionMode(projectionMode === '3D' ? '2D' : '3D')}
                        label={projectionMode}
                    />
                </ControlGroup>
                
                <ControlGroup label="DISTÂNCIA">
                    <ToggleButton 
                        active={zoomLevel === 'close'} 
                        onClick={() => setZoomLevel(zoomLevel === 'large' ? 'close' : 'large')}
                        label={zoomLevel === 'large' ? 'LONGE' : 'PERTO'}
                    />
                </ControlGroup>

                <ControlGroup label="VELOCIDADE">
                    <ToggleButton 
                        active={speedMode === 'slow'} 
                        onClick={() => setSpeedMode(speedMode === 'real' ? 'slow' : 'real')}
                        label={speedMode === 'real' ? 'REAL' : 'LENTO'}
                    />
                </ControlGroup>

                <ControlGroup label="ESCALA">
                    <ToggleButton 
                        active={scaleMode !== 'stretched'} 
                        onClick={() => {
                            if (scaleMode === 'stretched') setScaleMode('distance');
                            else if (scaleMode === 'distance') setScaleMode('size');
                            else setScaleMode('stretched');
                        }}
                        label={scaleMode === 'stretched' ? 'ADAPT' : scaleMode === 'distance' ? 'DIST' : 'TAM'}
                    />
                </ControlGroup>

                <ControlGroup label="ALINHAMENTO">
                    <ToggleButton 
                        active={isLinear} 
                        onClick={() => setIsLinear(!isLinear)}
                        label={isLinear ? 'LINEAR' : 'ORBITAL'}
                    />
                </ControlGroup>
            </div>

            {/* Data Panel - Horizontal Bottom Dock */}
            <div id="data" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-row gap-2 bg-black/40 backdrop-blur-2xl p-4 rounded-full border border-white/5 shadow-2xl max-w-[90vw] overflow-x-auto custom-scrollbar no-scrollbar">
                {PLANETS.map(planet => (
                    <button
                        key={planet.id}
                        onClick={() => setActivePlanet(planet)}
                        className={cn(
                            "px-6 py-2 rounded-full transition-all text-[10px] tracking-widest font-bold whitespace-nowrap",
                            activePlanet?.id === planet.id 
                                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105" 
                                : "text-white/40 hover:text-white/80 hover:bg-white/5"
                        )}
                    >
                        {planet.name.toUpperCase()}
                    </button>
                ))}
            </div>

            <div 
                id="universe" 
                onClick={() => setActivePlanet(null)}
            >
                <div id="galaxy">
                    <div 
                        id="solar-system" 
                        className={speedMode === 'slow' ? 'slow-speed' : ''}
                        style={{ '--zoom-scale': zoomScale } as React.CSSProperties}
                    >
                        {/* The Sun */}
                        <div id="sun" onClick={handleSunClick} className="cursor-pointer" />

                        {/* Celestial Bodies */}
                        {PLANETS.filter(p => p.id !== 'sun' && p.id !== 'moon').map(planet => (
                            <div 
                                key={planet.id} 
                                id={planet.id} 
                                className={cn("orbit", activePlanet?.id === planet.id && "active-planet")}
                                style={{ 
                                    animationDuration: `${ORBITAL_PERIODS[planet.id] * (speedMode === 'slow' ? 5 : 1)}s` 
                                }}
                            >
                                <div 
                                    className="pos"
                                    style={{ 
                                        animationDuration: `${ORBITAL_PERIODS[planet.id] * (speedMode === 'slow' ? 5 : 1)}s` 
                                    }}
                                >
                                    <div 
                                        className="planet cursor-pointer"
                                        onClick={(e) => handlePlanetClick(planet, e)}
                                        style={{ 
                                            animationDuration: `${ORBITAL_PERIODS[planet.id] * (speedMode === 'slow' ? 5 : 1)}s` 
                                        }}
                                    >
                                        <dl className="infos">
                                            <dt>{planet.name}</dt>
                                            <dd className="after:content-[attr(data-value)]" data-value={getOverlayValue(planet.id)}>
                                                <span className="after:content-[attr(data-label)]" data-label={getOverlayLabel()}></span>
                                            </dd>
                                        </dl>
                                    </div>
                                    
                                    {/* Saturn Rings */}
                                    {planet.id === 'saturn' && <div className="ring" />}

                                    {/* Moon for Earth */}
                                    {planet.id === 'earth' && (
                                        <div className="orbit" style={{ animationDuration: `${ORBITAL_PERIODS.moon}s` }}>
                                            <div 
                                                className="pos"
                                                style={{ animationDuration: `${ORBITAL_PERIODS.moon}s` }}
                                            >
                                                <div className="moon" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ControlGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold text-white/40 tracking-widest">{label}</span>
        {children}
    </div>
);

const ToggleButton: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
    <button
        onClick={onClick}
        className={cn(
            "w-24 h-12 rounded-2xl border transition-all flex items-center justify-center text-[10px] font-bold tracking-[0.1em]",
            active 
                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white/80"
        )}
    >
        {label.toUpperCase()}
    </button>
);

export default OrbitView;
