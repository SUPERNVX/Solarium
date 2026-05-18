/* eslint-disable */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../../../store';

const PLANET_RADIUS = 0.8;
const RING_INNER = 1.5;
const RING_OUTER = 12.0;

export default function J1407b() {
    const { celestialRotation } = useStore();
    const groupRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const planetRef = useRef<THREE.Mesh>(null);

    // Procedural Gas Giant Shader
    const planetMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color('#3a2411') }, // Dark brown
                uColor2: { value: new THREE.Color('#8b5a2b') }, // Light brown
                uColor3: { value: new THREE.Color('#cd853f') }  // Tan
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform vec3 uColor3;
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;

                // Simple noise
                float random(vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
                }
                float noise(vec2 st) {
                    vec2 i = floor(st);
                    vec2 f = fract(st);
                    float a = random(i);
                    float b = random(i + vec2(1.0, 0.0));
                    float c = random(i + vec2(0.0, 1.0));
                    float d = random(i + vec2(1.0, 1.0));
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                }

                void main() {
                    // Create gas bands
                    float bandNoise = noise(vec2(vUv.y * 15.0, uTime * 0.05));
                    float band = sin(vUv.y * 30.0 + bandNoise * 2.0) * 0.5 + 0.5;
                    
                    vec3 color = mix(uColor1, uColor2, band);
                    color = mix(color, uColor3, noise(vec2(vUv.x * 5.0, vUv.y * 10.0)) * 0.5);

                    // Add some shading (fake lighting)
                    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
                    float diff = max(dot(vNormal, lightDir), 0.0);
                    vec3 ambient = color * 0.2;
                    
                    gl_FragColor = vec4(ambient + color * diff, 1.0);
                }
            `
        });
    }, []);

    const ringMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uColorInner: { value: new THREE.Color('#3a2411') },
                uColorOuter: { value: new THREE.Color('#f4a460') }
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vRadius;
                void main() {
                    vUv = uv;
                    vRadius = length(position.xy);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uColorInner;
                uniform vec3 uColorOuter;
                varying vec2 vUv;
                varying float vRadius;

                float random(vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
                }

                void main() {
                    // Create ring gaps
                    float r = (vRadius - 1.5) / 10.5; // normalize 0 to 1 based on INNER and OUTER
                    float n1 = random(vec2(floor(r * 150.0), 1.0));
                    float n2 = random(vec2(floor(r * 40.0), 1.0));
                    
                    // Specific large gaps
                    float gap1 = smoothstep(0.25, 0.26, r) - smoothstep(0.28, 0.29, r);
                    float gap2 = smoothstep(0.55, 0.56, r) - smoothstep(0.62, 0.63, r);
                    float gap3 = smoothstep(0.80, 0.81, r) - smoothstep(0.83, 0.84, r);
                    float gaps = 1.0 - clamp(gap1 + gap2 + gap3, 0.0, 1.0);
                    
                    vec3 color = mix(uColorInner, uColorOuter, r + (n1 * 0.2));
                    
                    // Base alpha determined by noise
                    float alpha = (0.3 + n2 * 0.6) * gaps;
                    
                    // Fade edges smoothly
                    alpha *= smoothstep(0.0, 0.05, r);
                    alpha *= 1.0 - smoothstep(0.95, 1.0, r);

                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = celestialRotation.x;
            groupRef.current.rotation.y = celestialRotation.y;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = clock.getElapsedTime() * -0.05;
        }
        if (planetRef.current) {
            planetMaterial.uniforms.uTime.value = clock.getElapsedTime();
            planetRef.current.rotation.y = clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh ref={planetRef} material={planetMaterial}>
                <sphereGeometry args={[PLANET_RADIUS, 64, 64]} />
            </mesh>
            <mesh ref={ringRef} material={ringMaterial} rotation-x={Math.PI / 2.2}>
                <ringGeometry args={[RING_INNER, RING_OUTER, 128, 64]} />
            </mesh>
        </group>
    );
}
