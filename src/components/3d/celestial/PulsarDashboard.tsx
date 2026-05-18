import { Activity, Radio, Palette } from 'lucide-react';
import { useStore } from '../../../store';

export default function PulsarDashboard() {
    const { pulsarParams, setPulsarParams } = useStore();
    const { rotationSpeed, tiltAngle, theme } = pulsarParams;

    const themes: { id: typeof theme; name: string; color: string }[] = [
        { id: 'blue', name: 'Siriús (Azul)', color: "#4488ff" },
        { id: 'purple', name: 'Nebulosa (Roxo)', color: "#aa44ff" },
        { id: 'red', name: 'Anã (Vermelho)', color: "#ff4444" },
        { id: 'green', name: 'Aurora (Verde)', color: "#44ff88" },
    ];

    return (
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-80 pointer-events-auto z-30 font-montserrat">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-sm p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <div>
                        <h2 className="text-white text-lg font-bold tracking-[0.2em] uppercase">Controle Pulsar</h2>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Simulador de Estrela de Nêutrons</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-white/40 flex items-center gap-2"><Radio size={12} /> Velocidade de Rotação</span>
                                <span className="text-white">{rotationSpeed.toFixed(1)}x</span>
                            </div>
                            <input
                                type="range" min="0.5" max="20" step="0.5" value={rotationSpeed}
                                onChange={(e) => setPulsarParams({ rotationSpeed: parseFloat(e.target.value) })}
                                className="w-full accent-white bg-white/10 h-[1px] appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-white/40 flex items-center gap-2"><Activity size={12} /> Inclinação Magnética</span>
                                <span className="text-white">{tiltAngle}°</span>
                            </div>
                            <input
                                type="range" min="0" max="90" step="1" value={tiltAngle}
                                onChange={(e) => setPulsarParams({ tiltAngle: parseInt(e.target.value) })}
                                className="w-full accent-white bg-white/10 h-[1px] appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="space-y-3">
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                <Palette size={12} /> Assinatura de Energia
                            </span>
                            <div className="flex gap-3 pt-2">
                                {themes.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setPulsarParams({ theme: t.id })}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                                            theme === t.id ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-40 hover:opacity-100'
                                        }`}
                                        style={{ backgroundColor: t.color }}
                                        title={t.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <div className="flex justify-between text-[9px] text-white/30 font-bold uppercase tracking-widest">
                            <span>Emissão: Ativa</span>
                            <span className="text-white/60">Status: Estável</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
