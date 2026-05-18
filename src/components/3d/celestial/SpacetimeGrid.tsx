import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../../store';
import { CELESTIAL_BODIES } from '../../../data/celestialBodies';

const vertexShader = `
uniform float uGravity;
uniform float uTime;
varying vec2 vUv;
varying float vDistortion;

void main() {
    vUv = uv;
    vec3 pos = position;

    float dist = length(pos.xy);
    
    // Matemática Segura Absoluta
    float safeGravity = max(0.001, uGravity);
    
    // Width dinâmico para garantir que estrelas menores tenham poços visíveis mas íngremes
    float width = 1.5 + pow(safeGravity, 0.3) * 0.8;
    
    float depthGauss = safeGravity * exp(-pow(dist / width, 2.0) * 0.5) * 5.0;
    float depthHyper = (safeGravity * 3.0) / (pow(dist / width, 1.5) + 0.1);
    
    // Blend dinâmico baseado na gravidade
    float blend = smoothstep(0.0, 50.0, safeGravity);
    float depth = mix(depthGauss, depthHyper, blend);
    
    depth = min(depth, 1200.0);
    
    pos.z -= depth;
    
    float wave = sin(dist * 1.0 - uTime * 0.8) * 0.05;
    pos.z -= wave;

    vDistortion = depth;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform vec3 uColor;
uniform float uGravity;
varying vec2 vUv;
varying float vDistortion;

void main() {
    float gridFreq = 50.0;
    vec2 grid = abs(fract(vUv * gridFreq - 0.5) - 0.5) / fwidth(vUv * gridFreq);
    float line = min(grid.x, grid.y);
    
    vec3 col = uColor;
    
    // AJUSTE RADICAL DE VISIBILIDADE
    vec3 deepCol = vec3(0.6, 0.1, 1.0);
    float shift = smoothstep(5.0, 40.0, vDistortion);
    col = mix(col, deepCol, shift);
    
    float glow = smoothstep(2.0, 25.0, vDistortion);
    col += vec3(0.8, 0.9, 1.0) * glow * 0.9;
    
    float alpha = 1.0 - min(line, 1.0);
    
    float distToCenter = length(vUv - 0.5);
    alpha *= smoothstep(0.5, 0.2, distToCenter);
    
    gl_FragColor = vec4(col, alpha * (0.35 + glow * 0.5));
}
`;

export default function SpacetimeGrid() {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    
    // Reatividade garantida via Store
    const activeCelestialIndex = useStore((state) => state.activeCelestialIndex);
    const targetGravity = CELESTIAL_BODIES[activeCelestialIndex]?.massGravity ?? 0.1;
    
    // REFORÇO DE CÁLCULO: Usamos um estado de física persistente e manual.
    // Isso evita qualquer dependência de bibliotecas externas (Framer, AnimeJS) que podem ter ciclos de vida conflitantes com o Three.js
    const physics = useRef({
        current: targetGravity,
        velocity: 0,
        lastTarget: targetGravity
    });

    // Uniforms estáveis: Previne que o React Three Fiber resete os valores ao re-renderizar o componente
    const uniforms = useMemo(() => ({
        uGravity: { value: targetGravity },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00ffff') }
    }), []);

    useFrame((state, delta) => {
        // Caso o target tenha mudado abruptamente, garantimos que a mola comece a agir
        // mas NÃO resetamos o 'current' para evitar o snapping (pulo instantâneo)
        if (targetGravity !== physics.current.lastTarget) {
            physics.current.lastTarget = targetGravity;
        }

        // Integração de Mola Amortecida (Damped Spring) de alta fidelidade
        // stiffness: rigidez da mola | damping: amortecimento (fricção)
        const stiffness = 70.0;
        const damping = 12.0;
        
        // Proteção contra saltos gigantes no tempo (ex: aba em background)
        const dt = Math.min(delta, 0.032); 

        const displacement = targetGravity - physics.current.current;
        const springForce = displacement * stiffness;
        const dampingForce = physics.current.velocity * damping;
        const acceleration = springForce - dampingForce;

        physics.current.velocity += acceleration * dt;
        physics.current.current += physics.current.velocity * dt;

        // Atualização forçada dos uniforms a cada frame (Reinforce)
        if (materialRef.current) {
            // Clamping final para segurança absoluta na GPU
            const safeValue = Math.max(0.001, physics.current.current);
            materialRef.current.uniforms.uGravity.value = safeValue;
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} frustumCulled={false}>
            <planeGeometry args={[130, 130, 256, 256]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
