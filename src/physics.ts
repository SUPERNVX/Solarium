export interface PhysicsData {
    radiusKm: number;
    distanceAU: number;
    orbitPeriodYears: number; // used for orbit angular speed
    rotationPeriodDays: number;
}

export const PHYSICS_DATA: Record<string, PhysicsData> = {
    sun: { radiusKm: 696340, distanceAU: 0, orbitPeriodYears: 1, rotationPeriodDays: 27 }, // For UI relative sizes, we will scale Sun drastically.
    mercury: { radiusKm: 2439, distanceAU: 0.39, orbitPeriodYears: 0.24, rotationPeriodDays: 58.6 },
    venus: { radiusKm: 6051, distanceAU: 0.72, orbitPeriodYears: 0.615, rotationPeriodDays: -243 },
    earth: { radiusKm: 6371, distanceAU: 1.0, orbitPeriodYears: 1.0, rotationPeriodDays: 1.0 },
    moon: { radiusKm: 1737, distanceAU: 0.1, orbitPeriodYears: 0.075, rotationPeriodDays: 27.3 }, // distance in AU from EARTH in 3D relative to earth (Visual hack: 0.1 AU)
    mars: { radiusKm: 3389, distanceAU: 1.52, orbitPeriodYears: 1.88, rotationPeriodDays: 1.03 },
    jupiter: { radiusKm: 69911, distanceAU: 5.20, orbitPeriodYears: 11.86, rotationPeriodDays: 0.41 },
    saturn: { radiusKm: 58232, distanceAU: 9.58, orbitPeriodYears: 29.45, rotationPeriodDays: 0.45 },
    uranus: { radiusKm: 25362, distanceAU: 19.22, orbitPeriodYears: 84, rotationPeriodDays: -0.72 },
    neptune: { radiusKm: 24622, distanceAU: 30.05, orbitPeriodYears: 164.8, rotationPeriodDays: 0.67 },
    pluto: { radiusKm: 1188, distanceAU: 39.48, orbitPeriodYears: 248, rotationPeriodDays: 6.39 },
    ceres: { radiusKm: 476, distanceAU: 2.77, orbitPeriodYears: 4.6, rotationPeriodDays: 0.38 },
    haumea: { radiusKm: 800, distanceAU: 43.2, orbitPeriodYears: 284, rotationPeriodDays: 0.16 },
    makemake: { radiusKm: 715, distanceAU: 45.8, orbitPeriodYears: 305, rotationPeriodDays: 0.94 },
    eris: { radiusKm: 1163, distanceAU: 68.0, orbitPeriodYears: 559, rotationPeriodDays: 1.08 },
};

export function getScaledRadius(id: string, mode: 'real' | 'presentation'): number {
    const data = PHYSICS_DATA[id];
    if (!data) return 1;

    // Earth radius = 6371 km.
    // In real mode, scale relative to Earth directly (e.g. Earth = 0.5 units).
    // In presentation mode, we make differences smaller.
    
    // Base unit: Earth = 1 unit
    const earthRatio = data.radiusKm / 6371.0;

    let scale = earthRatio * 1.5; // Base visual size

    if (mode === 'presentation') {
        if (id === 'sun') scale = 12; // Cap sun size
        else if (scale > 4) scale = 3 + Math.log10(scale); // Logarithmic curve for gas giants
        else scale = Math.max(0.4, scale); // Minimum size for visibility
        return scale;
    }

    if (id === 'sun') return 30; // Still capped to not blind everything, but bigger
    return scale;
}

export function getScaledDistance(id: string, mode: 'real' | 'presentation'): number {
    const data = PHYSICS_DATA[id];
    if (!data) return 20;

    // Distances in AU. 1 AU = 15 units
    const baseDistance = data.distanceAU;
    if (baseDistance === 0) return 0;
    
    // Moon distance hack: since it orbits earth in the same scene
    if (id === 'moon') return 3; // 3 units away from earth

    if (mode === 'presentation') {
        // Logarithmic scale so deep space planets are visible
        return 12 + Math.log10(baseDistance + 1) * 35;
    }
    
    // 'real' mode: Linear scale
    // Inner planets will be packed tightly, outer planets will be very far
    return 10 + (baseDistance * 10);
}
