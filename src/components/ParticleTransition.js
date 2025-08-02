import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleTransition = ({ isActive }) => {
  const points = useRef();

  const numParticles = 5000;

  const particles = useMemo(() => {
    const p = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const i3 = i * 3;
      p[i3] = (Math.random() - 0.5) * 10;
      p[i3 + 1] = (Math.random() - 0.5) * 10;
      p[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [numParticles]);

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.02,
    color: '#ffffff',
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((state, delta) => {
    if (!points.current) return;

    if (isActive) {
      material.opacity = THREE.MathUtils.lerp(material.opacity, 1.0, 0.05);
      points.current.rotation.y += delta * 0.1;
      points.current.scale.x = THREE.MathUtils.lerp(points.current.scale.x, 1.5, 0.05);
      points.current.scale.y = THREE.MathUtils.lerp(points.current.scale.y, 1.5, 0.05);
      points.current.scale.z = THREE.MathUtils.lerp(points.current.scale.z, 1.5, 0.05);
    } else {
      material.opacity = THREE.MathUtils.lerp(material.opacity, 0, 0.1);
      if (material.opacity < 0.01) {
        points.current.visible = false;
      } else {
        points.current.visible = true;
      }
    }
  });

  useEffect(() => {
    if (isActive) {
      if (points.current) {
        points.current.visible = true;
        points.current.scale.set(0.1, 0.1, 0.1);
      }
    }
  }, [isActive]);

  return (
    <points ref={points} material={material}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
};

export default ParticleTransition;