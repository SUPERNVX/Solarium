/* eslint-disable */
import { useMemo, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const lensingShader = {
    uniforms: {
        "tDiffuse": { value: null },
        "blackHoleScreenPos": { value: new THREE.Vector2(0.5, 0.5) },
        "lensingStrength": { value: 0.12 }, "lensingRadius": { value: 0.3 },
        "aspectRatio": { value: 1.0 },
        "chromaticAberration": { value: 0.015 }, "scanlineIntensity": { value: 0.15 },
        "vignetteDarkness": { value: 0.8 }
    },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
        uniform sampler2D tDiffuse; uniform vec2 blackHoleScreenPos; uniform float lensingStrength;
        uniform float lensingRadius; uniform float aspectRatio; uniform float chromaticAberration;
        uniform float scanlineIntensity; uniform float vignetteDarkness; varying vec2 vUv;
        void main() {
            vec2 screenPos = vUv; vec2 toCenter = screenPos - blackHoleScreenPos;
            toCenter.x *= aspectRatio; float dist = length(toCenter);
            float distortionAmount = lensingStrength / (dist * dist + 0.003);
            distortionAmount = clamp(distortionAmount, 0.0, 0.7);
            float falloff = smoothstep(lensingRadius, lensingRadius * 0.3, dist);
            distortionAmount *= falloff; vec2 offset = normalize(toCenter) * distortionAmount;
            offset.x /= aspectRatio; vec2 distortedUvR = screenPos - offset * (1.0 + chromaticAberration);
            vec2 distortedUvG = screenPos - offset; vec2 distortedUvB = screenPos - offset * (1.0 - chromaticAberration);
            float r = texture2D(tDiffuse, distortedUvR).r; float g = texture2D(tDiffuse, distortedUvG).g;
            float b = texture2D(tDiffuse, distortedUvB).b; vec3 finalColor = vec3(r, g, b);
            
            // Opcional: Efeitos retro adicionais (removidos se quiser um visual limpo)
            // float scanline = sin(vUv.y * 800.0) * 0.5 + 0.5;
            // finalColor.rgb -= scanline * scanlineIntensity * finalColor.rgb;
            // float vignette = length(vUv - vec2(0.5)); finalColor *= (1.0 - vignette * vignetteDarkness);
            
            gl_FragColor = vec4(finalColor, 1.0);
        }`
};

export default function PostProcessingLensing({ targetRef }: { targetRef?: React.RefObject<THREE.Object3D | null> }) {
    const { gl, scene, camera, size } = useThree();
    const composer = useRef<EffectComposer | null>(null);
    const blackHoleScreenPosVec3 = useRef(new THREE.Vector3());

    const [bloomPass, lensingPass] = useMemo(() => {
        const bloom = new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 0.6, 0.7, 0.2);
        const lensing = new ShaderPass(lensingShader);
        return [bloom, lensing];
    }, [size]);

    useEffect(() => {
        lensingPass.uniforms.aspectRatio.value = size.width / size.height;
    }, [size, lensingPass]);

    useEffect(() => {
        const renderPass = new RenderPass(scene, camera);
        const newComposer = new EffectComposer(gl);
        newComposer.addPass(renderPass);
        newComposer.addPass(bloomPass);
        newComposer.addPass(lensingPass);
        composer.current = newComposer;

        return () => {
            newComposer.dispose();
            renderPass.dispose();
        };
    }, [gl, scene, camera, bloomPass, lensingPass]);

    useFrame((_, delta) => {
        if (targetRef?.current && composer.current) {
            // Atualizar a posição na tela da lente gravitacional
            blackHoleScreenPosVec3.current.copy(targetRef.current.position).project(camera);
            lensingPass.uniforms.blackHoleScreenPos.value.set(
                (blackHoleScreenPosVec3.current.x + 1) / 2,
                (blackHoleScreenPosVec3.current.y + 1) / 2
            );

            // Ajustar o tamanho do efeito baseado na distância para manter proporção visual
            const distance = Math.max(camera.position.distanceTo(targetRef.current.position), 5.0);
            const fovFactor = 1.0 / Math.tan((camera as THREE.PerspectiveCamera).fov * Math.PI / 360);
            
            // 1.3 é o BLACK_HOLE_RADIUS aproximado
            let screenRadius = (1.1 / distance) * fovFactor;
            
            // Limit the maximum size on screen so it doesn't consume the whole view when close
            screenRadius = Math.min(screenRadius, 0.10);
            
            lensingPass.uniforms.lensingRadius.value = screenRadius * 1.1; 
            lensingPass.uniforms.lensingStrength.value = screenRadius * 0.2;
        }

        // Renderizar a cena com os passes (prioridade 1 sobrescreve o render loop padrão do R3F)
        if (composer.current) {
            composer.current.render(delta);
        }
    }, 1);

    return null;
}
