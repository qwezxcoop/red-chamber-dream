import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FlowerPetalTransition = ({ isActive, color = '#E91E63' }) => {
  const points = useRef();

  const numParticles = 2000;

  // Create initial positions and random factors for movement
  const particles = useMemo(() => {
    const p = new Float32Array(numParticles * 3);
    const r = new Float32Array(numParticles);
    for (let i = 0; i < numParticles; i++) {
      const i3 = i * 3;
      p[i3] = (Math.random() - 0.5) * 15; // x
      p[i3 + 1] = (Math.random() - 0.5) * 10; // y
      p[i3 + 2] = (Math.random() - 0.5) * 10; // z
      r[i] = Math.random(); // random factor
    }
    return { positions: p, randoms: r };
  }, [numParticles]);

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.15,
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    map: null,
    alphaTest: 0.01, // 增强边缘清晰度
    sizeAttenuation: true,
  }), [color]);

  useFrame((state, delta) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position.array;
    const randoms = points.current.geometry.attributes.random.array;

    for (let i = 0; i < numParticles; i++) {
        const i3 = i * 3;
        // Fall down
        positions[i3 + 1] -= randoms[i] * delta * 2;
        // Drift sideways
        positions[i3] += Math.sin(state.clock.elapsedTime + randoms[i] * 10) * delta * 0.5;

        // Reset when out of view
        if (positions[i3+1] < -5) {
            positions[i3+1] = 5;
        }
    }

    points.current.geometry.attributes.position.needsUpdate = true;

    if (isActive) {
      material.opacity = THREE.MathUtils.lerp(material.opacity, 1.0, 0.05);
    } else {
      material.opacity = THREE.MathUtils.lerp(material.opacity, 0, 0.1);
    }
  });

  useEffect(() => {
    if (isActive) {
        if(points.current) points.current.visible = true;
    } else {
        if(points.current) {
            // Hide after fade out
            setTimeout(() => {
                if(points.current) points.current.visible = false;
            }, 1500)
        }
    }
  }, [isActive]);

  return (
    <points ref={points} material={material} visible={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-random"
          count={particles.randoms.length}
          array={particles.randoms}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
};

export default FlowerPetalTransition;