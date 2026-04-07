import type { FC } from 'react';
import type { PlanetData } from '../constants';
import { cn } from '../lib/utils';

const bodyTypeLabels: Record<string, string> = {
    star: 'Estrela',
    planet: 'Planeta',
    moon: 'Lua',
    dwarf: 'Planeta anão',
};

interface PlanetProps {
    data: PlanetData;
    index: number;
    selectedIndex: number;
    isInfoOpen: boolean;
    onReadMore: (planet: PlanetData) => void;
}

const Planet: FC<PlanetProps> = ({ data, index, selectedIndex, isInfoOpen, onReadMore }) => {
    const isSelected = index === selectedIndex;

    // Calculate 3D position relative to selected planet
    const zTranslation = (index - selectedIndex) * -2300;

    // Opacity decreases for distant planets
    const opacity = 1 - Math.abs(index - selectedIndex) * 0.5;

    // Use faster transition when info panel is open
    const transitionDuration = isInfoOpen ? '1000ms' : '2800ms';

    const bodyLabel = bodyTypeLabels[data.bodyType] || 'Planet';

    return (
        <div
            className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-none"
            style={{ zIndex: isSelected ? 10 : 0 }}
        >
            {/* The Planet Sphere */}
            <div
                className={cn(
                    "absolute bottom-[-920px] w-[1200px] h-[1200px] rounded-full preserve-3d",
                    isSelected ? "animate-[planet-rotation_60s_linear_infinite]" : ""
                )}
                style={{
                    background: `url(${data.textureUrl})`,
                    backgroundSize: '1140px 910px',
                    transform: `translateZ(${zTranslation}px) translateY(${isInfoOpen && isSelected ? '-600px' : '0px'}) rotateX(4deg) scale(${isInfoOpen && isSelected ? '0.75' : '0.89'}) translateX(${isInfoOpen && isSelected ? '-35vw' : '0px'})`,
                    opacity: Math.max(0, opacity + 1),
                    pointerEvents: isSelected ? 'all' : 'none',
                    boxShadow: `0 -590px 150px black inset, 0 0px 130px 40px ${data.glowColor} inset, 0 0px 23px 4px ${data.glowColor} inset, 0 -10px 130px ${data.shadowColor}`,
                    transition: `transform ${transitionDuration} cubic-bezier(0.33,0,0,1)`,
                    willChange: 'transform'
                }}
            >
                {/* Body name label - matching original moon label style */}
                <div
                    className="absolute text-center text-white uppercase"
                    style={{
                        top: '-140px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        opacity: isSelected ? 1 : 0,
                        transition: 'all 1s 3.2s'
                    }}
                >
                    <h3
                        style={{
                            fontWeight: 100,
                            fontSize: '20px',
                            letterSpacing: '5px',
                            color: '#fea082',
                            margin: 0,
                            position: 'relative',
                            top: '-120px'
                        }}
                    >
                        {bodyLabel}
                    </h3>
                    <h2
                        style={{
                            fontWeight: 100,
                            fontSize: '40px',
                            letterSpacing: '5px',
                            margin: 0,
                            position: 'relative',
                            top: '-120px'
                        }}
                    >
                        {data.name}
                    </h2>
                </div>
            </div>

            {/* Description Content - fades out when info panel is open */}
            <div
                className={cn(
                    "absolute top-[40%] right-[10%] -translate-y-1/2 w-[400px] transition-all duration-700",
                    isSelected && !isInfoOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 pointer-events-none"
                )}
            >
                <h2 className="text-[14px] uppercase font-thin tracking-[4px] text-[#f39041] mb-2 translate-y-4 transition-all duration-500 delay-[1.7s]">
                    {isSelected && !isInfoOpen ? bodyLabel : ''}
                </h2>
                <h1 className="text-[60px] font-bold uppercase tracking-[5px] leading-tight mb-4 translate-y-4 transition-all duration-500 delay-[1.8s]">
                    {data.name}
                </h1>
                <div className="transition-all duration-1000 delay-[2s]">
                    <p className="text-[14px] font-light leading-relaxed mb-8 opacity-80">{data.briefDescription}</p>
                    <button
                        onClick={() => onReadMore(data)}
                        className="group relative inline-flex items-center gap-2 text-white uppercase text-[12px] tracking-[2px] cursor-pointer pointer-events-auto"
                    >
                        Read Mais
                        <span className="group-hover:pl-1 transition-all">a</span>
                        <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#f39041] transition-all duration-300 group-hover:w-full" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Planet;
