import { useStore } from '../store';

export default function TopNav() {
    const { currentView, setCurrentView } = useStore();

    return (
        <header className="absolute top-0 left-0 w-full p-6 z-50 flex flex-col md:flex-row items-center justify-between uppercase">
            <div className="mb-4 md:mb-0">
                <span className="logo inline-block mr-2" style={{ fontSize: '24px' }}>Solar explorer</span>
                <span className="inline-block text-[#f39041] text-[12px]">NASA 3D Edition</span>
            </div>
            <nav className="flex gap-6 font-semibold text-sm tracking-widest bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
                <button 
                    onClick={() => setCurrentView('classic')}
                    className={`transition-colors duration-300 ${currentView === 'classic' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Clássica
                </button>
                <button 
                    onClick={() => setCurrentView('orbit')}
                    className={`transition-colors duration-300 ${currentView === 'orbit' ? 'text-[#f39041]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Órbitas 3D
                </button>
            </nav>
        </header>
    );
}
