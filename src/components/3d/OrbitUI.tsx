import { useStore } from '../../store';

export default function OrbitUI() {
    const { speedMode, setSpeedMode, sizeMode, setSizeMode } = useStore();

    return (
        <div className="absolute bottom-6 left-6 z-40 flex flex-col gap-4 font-montserrat select-none">
            
            <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-col gap-3">
                <span className="text-[#f39041] uppercase text-xs tracking-widest font-bold">Controles Visuais</span>
                
                <div className="flex flex-col gap-2">
                    <span className="text-white/60 text-xs uppercase uppercase">Tamanho</span>
                    <div className="flex bg-white/5 p-1 rounded hover:bg-white/10 transition">
                        <button
                            className={`flex-1 text-xs py-1 px-3 rounded uppercase transition ${sizeMode === 'presentation' ? 'bg-[#f39041] text-black font-bold' : 'text-white/70 hover:text-white'}`}
                            onClick={() => setSizeMode('presentation')}
                        >
                            Escala Visível
                        </button>
                        <button
                            className={`flex-1 text-xs py-1 px-3 rounded uppercase transition ${sizeMode === 'real' ? 'bg-[#f39041] text-black font-bold' : 'text-white/70 hover:text-white'}`}
                            onClick={() => setSizeMode('real')}
                        >
                            Realista
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-white/60 text-xs uppercase">Velocidade</span>
                    <div className="flex bg-white/5 p-1 rounded hover:bg-white/10 transition">
                        <button
                            className={`flex-1 text-xs py-1 px-3 rounded uppercase transition ${speedMode === 'slow' ? 'bg-[#f39041] text-black font-bold' : 'text-white/70 hover:text-white'}`}
                            onClick={() => setSpeedMode('slow')}
                        >
                            Lenta
                        </button>
                        <button
                            className={`flex-1 text-xs py-1 px-3 rounded uppercase transition ${speedMode === 'real' ? 'bg-[#f39041] text-black font-bold' : 'text-white/70 hover:text-white'}`}
                            onClick={() => setSpeedMode('real')}
                        >
                            Real
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
