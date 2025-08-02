import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShatterTransition = ({ isActive, color = '#FF6B6B' }) => {
  const groupRef = useRef();
  const shards = useRef([]);

  const numShards = 80;

  // Create shattered glass effect
  const shardData = useMemo(() => {
    const data = [];
    for (let i = 0; i < numShards; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 5,
          Math.random() * 3 - 1,
          (Math.random() - 0.5) * 3
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        scale: Math.random() * 0.3 + 0.1,
        opacity: 1
      });
    }
    return data;
  }, [numShards]);

  useFrame((state, delta) => {
    if (!groupRef.current || !isActive) return;

    shards.current.forEach((shard, i) => {
      if (!shard) return;
      
      const data = shardData[i];
      
      // Update positions with physics
      data.position.add(data.velocity.clone().multiplyScalar(delta));
      data.velocity.y -= delta * 2; // gravity
      data.rotation.x += data.rotationSpeed.x;
      data.rotation.y += data.rotationSpeed.y;
      data.rotation.z += data.rotationSpeed.z;
      
      // Fade out over time
      data.opacity = THREE.MathUtils.lerp(data.opacity, 0, 0.02);
      
      // Apply to mesh
      shard.position.copy(data.position);
      shard.rotation.copy(data.rotation);
      shard.material.opacity = data.opacity;
    });
  });

  useEffect(() => {
    if (isActive && groupRef.current) {
      // Reset all shards
      shardData.forEach((data, i) => {
        data.position.set(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4
        );
        data.velocity.set(
          (Math.random() - 0.5) * 8,
          Math.random() * 4 + 1,
          (Math.random() - 0.5) * 6
        );
        data.opacity = 1;
      });
      groupRef.current.visible = true;
    } else if (!isActive && groupRef.current) {
      setTimeout(() => {
        if (groupRef.current) groupRef.current.visible = false;
      }, 3000);
    }
  }, [isActive, shardData]);

  return (
    <group ref={groupRef} visible={false}>
      {shardData.map((data, i) => (
        <mesh
          key={i}
          ref={el => shards.current[i] = el}
          position={data.position}
          rotation={data.rotation}
          scale={[data.scale, data.scale, data.scale]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial 
            color={color}
            transparent
            opacity={data.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

export default ShatterTransition;
