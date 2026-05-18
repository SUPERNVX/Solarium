/* eslint-disable */
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../../../store';

const RADIUS = 0.8; // Increased from 0.3

export default function NeutronStar() {
    const { camera } = useThree();
    const { celestialRotation } = useStore();
    const groupRef = useRef<THREE.Group>(null);
    const starRef = useRef<THREE.Mesh>(null);
    const arcsRef = useRef<THREE.Group>(null);

    const surfaceMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uCameraPosition: { value: camera.position },
                uTime: { value: 0 }
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vPosition;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uCameraPosition;
                uniform float uTime;
                varying vec3 vNormal;
                varying vec3 vPosition;
                void main() {
                    vec3 viewDir = normalize(uCameraPosition - vPosition);
                    float fresnel = dot(vNormal, viewDir);
                    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
                    vec3 coreColor = vec3(0.8, 0.9, 1.0); // Intense white-blue
                    vec3 edgeColor = vec3(0.0, 0.5, 1.0); // Deep blue
                    vec3 color = mix(coreColor, edgeColor, pow(fresnel, 2.0));
                    
                    // High-speed pulsing
                    float pulse = sin(uTime * 50.0) * 0.1 + 0.9;
                    
                    gl_FragColor = vec4(color * pulse, 1.0);
                }
            `
        });
    }, [camera.position]);

    const arcMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 }
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
                varying vec2 vUv;
                void main() {
                    float speed = 8.0;
                    float dash = fract(vUv.x * 15.0 - uTime * speed);
                    float alpha = smoothstep(0.0, 0.2, dash) * smoothstep(1.0, 0.8, dash);
                    
                    // Fade near the poles where they attach to the star
                    float polarFade = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
                    
                    gl_FragColor = vec4(0.2, 0.6, 1.0, alpha * polarFade * 0.8);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false
        });
    }, []);

    useFrame(({ clock, camera: currentCamera }) => {
        const time = clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.x = celestialRotation.x;
            groupRef.current.rotation.y = celestialRotation.y;
        }
        if (starRef.current) {
            surfaceMaterial.uniforms.uTime.value = time;
            surfaceMaterial.uniforms.uCameraPosition.value.copy(currentCamera.position);
            starRef.current.rotation.y = time * 20.0; // Extremely fast rotation
        }
        if (arcsRef.current) {
            arcMaterial.uniforms.uTime.value = time;
            // The magnetic field rotates with the star
            arcsRef.current.rotation.y = time * 20.0;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh ref={starRef} material={surfaceMaterial}>
                <sphereGeometry args={[RADIUS, 64, 64]} />
            </mesh>
            
            <group ref={arcsRef}>
                {/* Create symmetric dipole magnetic field lines (like the image) */}
                {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI;
                    return (
                        <mesh key={i} rotation={[0, angle, 0]}>
                            {/* Torus scaled to look like an oval connecting the poles */}
                            <torusGeometry args={[RADIUS * 3.5, 0.05, 16, 100]} />
                            <primitive object={arcMaterial} attach="material" />
                        </mesh>
                    );
                })}
            </group>

        </group>
    );
}
