import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SnowTransition = ({ isActive, color = '#FFFFFF' }) => {
  const points = useRef();

  const numParticles = 1500;

  // Create initial positions for snowflakes
  const particles = useMemo(() => {
    const p = new Float32Array(numParticles * 3);
    const r = new Float32Array(numParticles);
    const sizes = new Float32Array(numParticles);
    
    for (let i = 0; i < numParticles; i++) {
      const i3 = i * 3;
      p[i3] = (Math.random() - 0.5) * 20; // x
      p[i3 + 1] = Math.random() * 15 + 5; // y - start above screen
      p[i3 + 2] = (Math.random() - 0.5) * 15; // z
      r[i] = Math.random(); // random factor
      sizes[i] = Math.random() * 0.1 + 0.05; // snowflake size
    }
    return { positions: p, randoms: r, sizes: sizes };
  }, [numParticles]);

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.12,
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
    alphaTest: 0.001, // 让雪花更清晰
  }), [color]);

  useFrame((state, delta) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position.array;
    const randoms = points.current.geometry.attributes.random.array;

    for (let i = 0; i < numParticles; i++) {
        const i3 = i * 3;
        // Snow falls down with varying speed
        positions[i3 + 1] -= randoms[i] * delta * 2.0; // 稍快一点的飘落
        // Gentle side-to-side drift with wind effect
        positions[i3] += Math.sin(state.clock.elapsedTime * 0.5 + randoms[i] * 10) * delta * 0.5;
        positions[i3 + 2] += Math.cos(state.clock.elapsedTime * 0.3 + randoms[i] * 5) * delta * 0.3;

        // 添加轻微的旋转效果
        const rotationFactor = Math.sin(state.clock.elapsedTime + randoms[i] * 20) * 0.1;
        positions[i3] += rotationFactor * delta;

        // Reset when out of view
        if (positions[i3 + 1] < -8) {
            positions[i3 + 1] = 8 + randoms[i] * 3; // 从不同高度开始
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 15;
        }
    }

    points.current.geometry.attributes.position.needsUpdate = true;

    if (isActive) {
      material.opacity = THREE.MathUtils.lerp(material.opacity, 0.8, 0.03);
    } else {
      material.opacity = THREE.MathUtils.lerp(material.opacity, 0, 0.1);
    }
  });

  useEffect(() => {
    if (isActive) {
        if(points.current) points.current.visible = true;
    } else {
        if(points.current) {
            setTimeout(() => {
                if(points.current) points.current.visible = false;
            }, 2000)
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
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
};

export default SnowTransition;
