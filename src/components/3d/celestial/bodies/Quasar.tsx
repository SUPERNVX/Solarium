/* eslint-disable */
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import PostProcessingLensing from '../PostProcessingLensing';
import { useStore } from '../../../../store';

const BLACK_HOLE_RADIUS = 3.0; 
const DISK_INNER_RADIUS = BLACK_HOLE_RADIUS + 0.5;
const DISK_OUTER_RADIUS = 20.0; 
const DISK_TILT_ANGLE = Math.PI / 3.0;
const JET_LENGTH = 50.0;

export default function Quasar() {
    const { camera } = useThree();
    const { celestialRotation } = useStore();
    const groupRef = useRef<THREE.Group>(null);
    const eventHorizonRef = useRef<THREE.Mesh>(null);
    const diskRef = useRef<THREE.Mesh>(null);
    const blackHoleRef = useRef<THREE.Mesh>(null);
    const jetsRef = useRef<THREE.Group>(null);

    const eventHorizonMat = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: { uTime: { value: 0 }, uCameraPosition: { value: camera.position } },
            vertexShader: `
                varying vec3 vNormal; varying vec3 vPosition;
                void main() {
                    vNormal = normalize(normalMatrix * normal); vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }`,
            fragmentShader: `
                uniform float uTime; uniform vec3 uCameraPosition;
                varying vec3 vNormal; varying vec3 vPosition;
                void main() {
                    vec3 viewDirection = normalize(uCameraPosition - vPosition);
                    float fresnel = 1.0 - abs(dot(vNormal, viewDirection));
                    fresnel = pow(fresnel, 2.0); vec3 glowColor = vec3(1.0, 1.0, 1.0); 
                    float pulse = sin(uTime * 5.0) * 0.2 + 0.8;
                    gl_FragColor = vec4(glowColor * fresnel * pulse, fresnel * 0.8);
                }`,
            transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide
        });
    }, [camera.position]);

    const diskMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.0 }, uColorHot: { value: new THREE.Color(0xffffff) },
                uColorMid1: { value: new THREE.Color(0xaaccff) }, uColorMid2: { value: new THREE.Color(0x3366ff) },
                uColorOuter: { value: new THREE.Color(0x111144) }, uNoiseScale: { value: 1.5 },
                uFlowSpeed: { value: 0.3 }, uDensity: { value: 3.0 }
            },
            vertexShader: `
                varying vec2 vUv; varying float vRadius; varying float vAngle;
                void main() {
                    vUv = uv; vRadius = length(position.xy); vAngle = atan(position.y, position.x);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }`,
            fragmentShader: `
                uniform float uTime; uniform vec3 uColorHot; uniform vec3 uColorMid1; uniform vec3 uColorMid2; uniform vec3 uColorOuter;
                uniform float uNoiseScale; uniform float uFlowSpeed; uniform float uDensity;
                varying vec2 vUv; varying float vRadius; varying float vAngle;
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                float snoise(vec3 v) {
                    const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                    vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
                    vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g; vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
                    vec3 x1 = x0 - i1 + C.xxx; vec3 x2 = x0 - i2 + C.yyy; vec3 x3 = x0 - D.yyy;
                    i = mod289(i); vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                    float n_ = 0.142857142857; vec3 ns = n_ * D.wyz - D.xzx; vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                    vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_); vec4 x = x_ * ns.x + ns.yyyy; vec4 y = y_ * ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y); vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
                    vec4 s0 = floor(b0) * 2.0 + 1.0; vec4 s1 = floor(b1) * 2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
                    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
                    vec3 p0 = vec3(a0.xy, h.x); vec3 p1 = vec3(a0.zw, h.y); vec3 p2 = vec3(a1.xy, h.z); vec3 p3 = vec3(a1.zw, h.w);
                    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
                    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
                    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
                    m = m * m; return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
                }
                void main() {
                    float normalizedRadius = smoothstep(3.5, 20.0, vRadius);
                    float timeOffset = uTime * uFlowSpeed * (2.0 / (vRadius * 0.1 + 1.0));
                    vec2 noiseUv = vec2(vAngle * 3.0 + timeOffset, vRadius * 0.3);
                    float noiseVal1 = snoise(vec3(noiseUv * uNoiseScale, uTime * 0.2));
                    float noiseVal2 = snoise(vec3(noiseUv * uNoiseScale * 2.0 + 0.8, uTime * 0.25));
                    float noiseVal = (noiseVal1 * 0.6 + noiseVal2 * 0.4); noiseVal = (noiseVal + 1.0) * 0.5;
                    vec3 color = mix(uColorOuter, uColorMid2, smoothstep(0.0, 0.4, normalizedRadius));
                    color = mix(color, uColorMid1, smoothstep(0.3, 0.7, normalizedRadius));
                    color = mix(color, uColorHot, smoothstep(0.6, 0.95, normalizedRadius));
                    float brightness = pow(1.0 - normalizedRadius, 1.2) * 6.0 + 1.0;
                    brightness *= (0.5 + noiseVal * 3.0);
                    float radialGrid = 1.0 - (sin(vRadius * 4.0 - uTime * 1.0) * 0.5 + 0.5);
                    radialGrid = pow(radialGrid, 4.0); float angleGrid = 1.0 - (sin(vAngle * 40.0) * 0.5 + 0.5);
                    angleGrid = pow(angleGrid, 4.0); float grid = 1.0 - clamp(radialGrid + angleGrid, 0.0, 1.0);
                    brightness *= (0.8 + grid * 0.5); float alpha = uDensity * (0.3 + noiseVal * 0.7);
                    alpha *= smoothstep(0.0, 0.1, normalizedRadius); alpha *= (1.0 - smoothstep(0.85, 1.0, normalizedRadius));
                    alpha = clamp(alpha, 0.0, 1.0); gl_FragColor = vec4(color * brightness, alpha);
                }`,
            transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending
        });
    }, []);

    const jetMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color('#ffffff') },
                uColorOuter: { value: new THREE.Color('#3366ff') }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec3 uColor;
                uniform vec3 uColorOuter;
                varying vec2 vUv;
                void main() {
                    float noise = fract(sin(dot(vUv * uTime * 2.0, vec2(12.9898,78.233))) * 43758.5453);
                    float alpha = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.3, vUv.y);
                    alpha *= (0.5 + noise * 0.5);
                    float edge = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
                    vec3 color = mix(uColorOuter, uColor, edge);
                    gl_FragColor = vec4(color, alpha * edge * 2.0);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false
        });
    }, []);

    useFrame(({ clock, camera: currentCamera }) => {
        const elapsedTime = clock.getElapsedTime();
        const delta = clock.getDelta();

        if (groupRef.current) {
            groupRef.current.rotation.x = celestialRotation.x;
            groupRef.current.rotation.y = celestialRotation.y;
        }

        if (diskRef.current) {
            diskMaterial.uniforms.uTime.value = elapsedTime;
            diskRef.current.rotation.z += delta * 1.5; 
        }

        if (eventHorizonRef.current) {
            eventHorizonMat.uniforms.uTime.value = elapsedTime;
            eventHorizonMat.uniforms.uCameraPosition.value.copy(currentCamera.position);
        }

        if (jetsRef.current) {
            jetMaterial.uniforms.uTime.value = elapsedTime;
            jetsRef.current.rotation.y = elapsedTime * 5.0;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh ref={blackHoleRef} renderOrder={0}>
                <sphereGeometry args={[BLACK_HOLE_RADIUS, 128, 64]} />
                <meshBasicMaterial color={0x000000} />
            </mesh>

            <mesh ref={eventHorizonRef} material={eventHorizonMat}>
                <sphereGeometry args={[BLACK_HOLE_RADIUS * 1.05, 128, 64]} />
            </mesh>

            <mesh ref={diskRef} material={diskMaterial} rotation-x={DISK_TILT_ANGLE} renderOrder={1}>
                <ringGeometry args={[DISK_INNER_RADIUS, DISK_OUTER_RADIUS, 256, 128]} />
            </mesh>

            <group ref={jetsRef}>
                <mesh position={[0, JET_LENGTH / 2, 0]}>
                    <cylinderGeometry args={[0.2, 4.0, JET_LENGTH, 64, 1, true]} />
                    <primitive object={jetMaterial} attach="material" />
                </mesh>
                <mesh position={[0, -JET_LENGTH / 2, 0]} rotation={[Math.PI, 0, 0]}>
                    <cylinderGeometry args={[0.2, 4.0, JET_LENGTH, 64, 1, true]} />
                    <primitive object={jetMaterial} attach="material" />
                </mesh>
            </group>

            <PostProcessingLensing targetRef={blackHoleRef} />
        </group>
    );
}
