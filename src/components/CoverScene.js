
import React, { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Icosahedron, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Glow Shader
const GlowMaterial = shaderMaterial(
  { glowColor: new THREE.Color(0xb9f6ca), power: 2.0, intensity: 2.0 },
  // vertex shader
  `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform vec3 glowColor;
    uniform float power;
    uniform float intensity;
    varying vec3 vNormal;
    void main() {
      float glow = power - dot(vNormal, vec3(0.0, 0.0, 1.0));
      gl_FragColor = vec4(glowColor * glow, 1.0);
    }
  `
);
extend({ GlowMaterial });

const FadingText = ({ children, position, onFadeOut }) => {
    const textRef = useRef();
    const [shouldFadeOut, setShouldFadeOut] = useState(false);

    useFrame(() => {
        if (!textRef.current) return;
        if (shouldFadeOut) {
            textRef.current.material.opacity = THREE.MathUtils.lerp(textRef.current.material.opacity, 0, 0.05);
            if (textRef.current.material.opacity < 0.01 && onFadeOut) {
                onFadeOut();
            }
        } else {
            textRef.current.material.opacity = THREE.MathUtils.lerp(textRef.current.material.opacity, 1, 0.05);
        }
    });

    const handleClick = () => {
        setShouldFadeOut(true);
    }

    const handlePointerOver = () => {
        if (textRef.current) {
            textRef.current.scale.setScalar(1.1);
        }
    }

    const handlePointerOut = () => {
        if (textRef.current) {
            textRef.current.scale.setScalar(1);
        }
    }

    return (
        <Text 
            ref={textRef} 
            position={position} 
            fontSize={0.3} 
            color="#FFFFFF" 
            anchorX="center" 
            material-transparent 
            material-opacity={0} 
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            {children}
        </Text>
    );
}

const CoverScene = ({ onEnter }) => {
  const jadeRef = useRef();
  const archRef = useRef();
  const glowRef = useRef();
  const [step, setStep] = useState(0); // 0: initial text, 1: jade, 2: entering
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Add mouse interaction effects
    const mouse = state.mouse;
    setMousePos({ x: mouse.x, y: mouse.y });
    
    if (step === 1) {
        if(jadeRef.current) {
            jadeRef.current.material.opacity = THREE.MathUtils.lerp(jadeRef.current.material.opacity, 0.9, 0.05);
            jadeRef.current.rotation.y += delta * 0.1;
            // Add subtle mouse following
            jadeRef.current.rotation.x = THREE.MathUtils.lerp(jadeRef.current.rotation.x, mouse.y * 0.1, 0.1);
            jadeRef.current.rotation.z = THREE.MathUtils.lerp(jadeRef.current.rotation.z, mouse.x * 0.1, 0.1);
        }
        if(archRef.current) {
            archRef.current.material.opacity = THREE.MathUtils.lerp(archRef.current.material.opacity, 0.7, 0.05);
            // Gentle floating motion
            archRef.current.position.y = 2.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
        if(glowRef.current) {
            // Pulsing glow effect
            glowRef.current.material.uniforms.intensity.value = 2.0 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
        }
    } else if (step === 2) {
        if(jadeRef.current) {
            jadeRef.current.scale.lerp(new THREE.Vector3(10, 10, 10), 0.05);
            jadeRef.current.material.opacity = THREE.MathUtils.lerp(jadeRef.current.material.opacity, 0, 0.05);
            if(jadeRef.current.material.opacity < 0.01) {
                onEnter();
            }
        }
    }
  });

  const handleJadeClick = () => {
      setStep(2);
  }

  return (
    <group>
        {step === 0 && <FadingText position={[0, 0, 0]} onFadeOut={() => setStep(1)}>此开卷第一回也。</FadingText>}
        
        {step >= 1 && (
            <Suspense fallback={null}>
                {/* Floating mystical particles */}
                {[...Array(20)].map((_, i) => (
                    <mesh key={i} position={[
                        Math.sin(i * 2) * 8 + mousePos.x * 2,
                        Math.cos(i * 3) * 6 + mousePos.y * 1,
                        Math.sin(i) * 5
                    ]}>
                        <sphereGeometry args={[0.02, 8, 8]} />
                        <meshBasicMaterial color="#B9F6CA" transparent opacity={0.6} />
                    </mesh>
                ))}
                
                <Icosahedron ref={jadeRef} args={[1, 1]} material-transparent material-opacity={0} onClick={handleJadeClick}>
                    <meshStandardMaterial color="#B9F6CA" roughness={0.1} metalness={0.5} />
                </Icosahedron>
                
                <mesh ref={glowRef}>
                    <icosahedronGeometry args={[1.1, 1]} />
                    <glowMaterial />
                </mesh>
                
                <Text ref={archRef} position={[0, 2.5, -2]} fontSize={1.5} color="#FFFFFF" material-transparent material-opacity={0}>
                    太虚幻境
                </Text>
                
                {/* Add ambient floating text */}
                <Text position={[-4, 1, -3]} fontSize={0.3} color="#B9F6CA" material-transparent material-opacity={0.5}>
                    甄士隐梦幻识通灵
                </Text>
                <Text position={[4, -1, -3]} fontSize={0.3} color="#B9F6CA" material-transparent material-opacity={0.5}>
                    贾雨村风尘怀闺秀
                </Text>
            </Suspense>
        )}
    </group>
  );
};

export default CoverScene;
