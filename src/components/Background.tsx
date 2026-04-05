import type { FC } from 'react';

interface Star {
    left: string;
    top: string;
    size: string;
    delay: string;
}

// Generate stars once at module level to avoid impure Math.random() during render
const STARS: Star[] = Array.from({ length: 200 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    delay: `${Math.random() * 5}s`,
}));

const Background: FC = () => {
    return (
        <div className="fixed inset-0 bg-black overflow-hidden pointer-events-none z-0">
            {STARS.map((star, i) => (
                <div
                    key={i}
                    className="star"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                        animationDelay: star.delay,
                    }}
                />
            ))}
            {/* Nebula/Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a20] to-transparent opacity-40" />
        </div>
    );
};

export default Background;
