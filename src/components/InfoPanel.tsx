import type { FC } from 'react';
import type { PlanetData } from '../constants';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface InfoPanelProps {
    planet: PlanetData | null;
    onClose: () => void;
}

const InfoPanel: FC<InfoPanelProps> = ({ planet, onClose }) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-[60] transition-all duration-700",
                    planet ? "bg-black/40 pointer-events-auto" : "bg-black/0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Info Panel */}
            <div
                className={cn(
                    "fixed top-0 right-0 bottom-0 z-[70] w-[50%] max-w-[640px] transition-all duration-700 ease-[cubic-bezier(0.33,0,0,1)] overflow-y-auto",
                    planet ? "translate-x-0" : "translate-x-full"
                )}
            >
                {planet && (
                    <div className="flex flex-col min-h-full p-12 lg:p-16">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="self-end p-2 hover:bg-white/10 rounded-full transition-colors mb-8"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Planet Name */}
                        <div className="opacity-0 animate-[fadeIn_0.5s_0.2s_forwards]">
                            <h2 className="text-[12px] uppercase font-thin tracking-[6px] text-[#f39041] mb-2">
                                Planet
                            </h2>
                            <h1 className="text-5xl lg:text-6xl font-bold uppercase tracking-[6px] leading-tight mb-8">
                                {planet.name}
                            </h1>
                        </div>

                        {/* Full Description */}
                        <div className="flex flex-col gap-6 text-[15px] font-light leading-relaxed opacity-80 opacity-0 animate-[fadeIn_0.5s_0.4s_forwards]">
                            {planet.fullDescription.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        {/* Landscape Image */}
                        <div className="mt-10 rounded-lg overflow-hidden border border-white/10 opacity-0 animate-[fadeIn_0.5s_0.6s_forwards]">
                            <img
                                src={planet.landscapeUrl}
                                alt={`${planet.name} landscape`}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Key Statistics */}
                        <div className="mt-10 opacity-0 animate-[fadeIn_0.5s_0.8s_forwards]">
                            <h3 className="text-sm uppercase tracking-[4px] text-[#f39041] mb-4">
                                Key Statistics
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-white/5 rounded-lg border border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2">
                                        Distance from Sun
                                    </p>
                                    <p className="text-lg font-semibold">{planet.distanceAU}</p>
                                </div>
                                {planet.moons.length > 0 && (
                                    <div className="p-5 bg-white/5 rounded-lg border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2">
                                            Moons
                                        </p>
                                        <p className="text-lg font-semibold">{planet.moons.length}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom spacing */}
                        <div className="h-16" />
                    </div>
                )}
            </div>
        </>
    );
};

export default InfoPanel;
