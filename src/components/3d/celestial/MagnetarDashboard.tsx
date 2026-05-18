import { useState } from 'react';
import { Activity, Eye, ShieldAlert, Radio } from 'lucide-react';
import { useStore } from '../../../store';

export default function MagnetarDashboard() {
    const { magnetarParams, setMagnetarParams } = useStore();
    const { fieldStrength, rotationSpeed, jetIntensity, layer } = magnetarParams;

    const [starquakesTriggered, setStarquakesTriggered] = useState(0);

    const triggerStarquake = () => {
        setMagnetarParams({ flareIntensity: 5 });
        setStarquakesTriggered(prev => prev + 1);
    };

    const layers: { id: typeof layer; name: string }[] = [
        { id: 'all', name: 'Emissão Total' },
        { id: 'core', name: 'Núcleo e Jatos' },
        { id: 'magnetic', name: 'Linhas de Campo' },
        { id: 'crust', name: 'Geometria da Crosta' },
    ];

    return (
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-80 pointer-events-auto z-30 font-montserrat">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-sm p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <div>
                        <h2 className="text-white text-lg font-bold tracking-[0.2em] uppercase">Controle MT-X1</h2>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Sistema de Diagnóstico Magnetar</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <Eye size={12} /> Camadas
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                            {layers.map((l) => (
                                <button
                                    key={l.id}
                                    onClick={() => setMagnetarParams({ layer: l.id })}
                                    className={`py-2 px-1 text-[9px] font-bold uppercase tracking-widest border transition-all ${
                                        layer === l.id ? 'bg-white text-black border-white' : 'bg-transparent text-white/60 border-white/10 hover:border-white/40'
                                    }`}
                                >
                                    {l.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-white/40 flex items-center gap-2"><Activity size={12} /> Intensidade do Campo</span>
                                <span className="text-white">{(fieldStrength * 10).toFixed(0)}G</span>
                            </div>
                            <input
                                type="range" min="1" max="15" step="0.5" value={fieldStrength}
                                onChange={(e) => setMagnetarParams({ fieldStrength: parseFloat(e.target.value) })}
                                className="w-full accent-white bg-white/10 h-[1px] appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-white/40 flex items-center gap-2"><Radio size={12} /> Rotação</span>
                                <span className="text-white">{(rotationSpeed * 0.16).toFixed(2)}Hz</span>
                            </div>
                            <input
                                type="range" min="0.2" max="5" step="0.2" value={rotationSpeed}
                                onChange={(e) => setMagnetarParams({ rotationSpeed: parseFloat(e.target.value) })}
                                className="w-full accent-white bg-white/10 h-[1px] appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-white/40 flex items-center gap-2"><ShieldAlert size={12} /> Taxa de Jato</span>
                                <span className="text-white">{(jetIntensity * 10).toFixed(0)}%</span>
                            </div>
                            <input
                                type="range" min="0" max="10" step="1" value={jetIntensity}
                                onChange={(e) => setMagnetarParams({ jetIntensity: parseInt(e.target.value) })}
                                className="w-full accent-white bg-white/10 h-[1px] appearance-none cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={triggerStarquake}
                            className="w-full py-3 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                        >
                            Disparar Terremoto Estelar
                        </button>
                        <div className="flex justify-between mt-4 text-[9px] text-white/30 font-bold uppercase tracking-widest">
                            <span>Eventos: {starquakesTriggered}</span>
                            <span className="text-white/60">Risco: Extremo</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
