import type { FC } from 'react';
import { PLANETS } from '../constants';
import { cn } from '../lib/utils';

interface NavigationProps {
    selectedIndex: number;
    onSelect: (index: number) => void;
}

const Navigation: FC<NavigationProps> = ({ selectedIndex, onSelect }) => {
    return (
        <nav className="fixed left-[90px] top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-0 pointer-events-auto">
            {[...PLANETS].reverse().map((planet) => {
                // Original menu logic: indices are 1-based and based on the ID's planet number in original CSS
                // but it's simpler to just find the actual index in the original array
                const originalIndex = PLANETS.findIndex(p => p.id === planet.id);
                const isSelected = selectedIndex === originalIndex;

                return (
                    <button
                        key={planet.id}
                        onClick={() => onSelect(originalIndex)}
                        className={cn(
                            "group relative flex items-center h-[48px] cursor-pointer text-left transition-all duration-300",
                            isSelected ? "opacity-100" : "opacity-40 hover:opacity-100"
                        )}
                    >
                        {/* Pip indicator */}
                        <div className={cn(
                            "absolute -left-[4px] top-[18px] w-[12px] h-[12px] border-2 border-white rounded-full transition-all",
                            isSelected && "after:content-[''] after:absolute after:inset-[2px] after:bg-white after:rounded-full"
                        )} />

                        {/* Planet Preview */}
                        <div
                            className="w-[30px] h-[30px] rounded-full shadow-[0_-13px_10px_2px_rgba(0,0,0,0.8)_inset] ml-[10px] overflow-hidden"
                            style={{
                                background: `url(${planet.textureUrl})`,
                                backgroundSize: 'auto 100%',
                                backgroundPosition: 'center'
                            }}
                        />

                        {/* Planet Info */}
                        <div className="ml-4 flex flex-col justify-center">
                            <div className="flex items-center">
                                <div
                                    className="h-[9px] transition-all duration-300"
                                    style={{
                                        width: isSelected ? '30px' : '0px',
                                        backgroundColor: planet.color,
                                        marginRight: isSelected ? '6px' : '0px'
                                    }}
                                />
                                <h2 className="text-[11px] font-thin uppercase tracking-[2px] leading-none text-white">
                                    {planet.name}
                                </h2>
                            </div>
                            <h3 className={cn(
                                "text-[8px] font-thin uppercase tracking-[1px] transition-all duration-300 mt-1",
                                isSelected ? "opacity-100" : "opacity-30"
                            )} style={{ color: isSelected ? planet.color : 'white' }}>
                                {planet.distanceAU}
                            </h3>
                        </div>
                    </button>
                );
            })}
        </nav>
    );
};

export default Navigation;
