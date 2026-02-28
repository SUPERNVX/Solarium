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
            <div
                className={cn(
                    "fixed inset-0 z-[60] bg-[#382563]/30 transition-all duration-300",
                    planet ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            >
                <div className="absolute left-[10%] top-1/2 -translate-y-1/2 text-white text-[30px] opacity-0 animate-pulse text-center">
                    Back
                </div>
            </div>

            <div
                className={cn(
                    "fixed top-0 bottom-0 right-0 w-[420px] z-[70] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out p-12 overflow-y-auto scrollbar-hide",
                    planet ? "translate-x-0" : "translate-x-full"
                )}
                style={{ backgroundColor: 'black' }}
            >
                {planet && (
                    <div className="flex flex-col gap-8 opacity-0 animate-[fadeIn_0.5s_0.3s_forwards]">
                        <button
                            onClick={onClose}
                            className="self-end p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h1 className="text-4xl font-bold uppercase tracking-wider">{planet.name}</h1>

                        <div className="flex flex-col gap-6 text-[14px] font-light leading-loose opacity-80">
                            {planet.fullDescription.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        <div className="my-4 rounded-lg overflow-hidden border border-white/10">
                            <img
                                src={planet.landscapeUrl}
                                alt={`${planet.name} landscape`}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold text-primary">Key Statistics</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Distance</p>
                                    <p className="font-bold">{planet.distanceAU}</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-20" />
                    </div>
                )}
            </div>
        </>
    );
};

export default InfoPanel;
