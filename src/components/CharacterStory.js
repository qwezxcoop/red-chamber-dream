
import React, { useState, useEffect, Suspense } from 'react';
import { useTransition, animated } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { characters } from '../data';
import CharacterScene from './CharacterScene';

const CharacterStory = ({ charIndex }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);
  const character = characters[charIndex];

  // Manual scene switching
  const nextScene = () => {
    setSceneIndex((prevIndex) => (prevIndex + 1) % character.scenes.length);
    setIsManualControl(true);
  };

  const prevScene = () => {
    setSceneIndex((prevIndex) => (prevIndex - 1 + character.scenes.length) % character.scenes.length);
    setIsManualControl(true);
  };

  // Auto-advance unless user has taken manual control
  useEffect(() => {
    if (isManualControl) return;
    
    const timer = setTimeout(() => {
      setSceneIndex((prevIndex) => (prevIndex + 1) % character.scenes.length);
    }, 8000); // 8 seconds per scene
    return () => clearTimeout(timer);
  }, [sceneIndex, character.scenes.length, isManualControl]);

  // Reset manual control after some time
  useEffect(() => {
    if (!isManualControl) return;
    
    const resetTimer = setTimeout(() => {
      setIsManualControl(false);
    }, 15000); // Resume auto-advance after 15 seconds
    
    return () => clearTimeout(resetTimer);
  }, [isManualControl]);

  // Simplified transition to avoid interpolation issues
  const sceneTransitions = useTransition(sceneIndex, {
    from: { 
      opacity: 0, 
      scale: 0.8
    },
    enter: { 
      opacity: 1, 
      scale: 1
    },
    leave: { 
      opacity: 0, 
      scale: 0.8
    },
    config: { mass: 1, tension: 200, friction: 30 },
    delay: 200,
  });

  return (
    <group>
      {sceneTransitions((style, i) => (
        <animated.group scale={style.scale}>
          <Suspense fallback={null}>
            <CharacterScene 
              scene={character.scenes[i]} 
              characterName={character.name} 
            />
          
          {/* Scene progress indicator - 调整位置避免重叠 */}
          <group position={[6, 4, 0]}>
            <Text fontSize={0.25} color="#FFFFFF" anchorX="center">
              {character.name}
            </Text>
            <Text position={[0, -0.4, 0]} fontSize={0.18} color="#FFD700" anchorX="center">
              {character.scenes[i].poem}
            </Text>
            <Text position={[0, -0.8, 0]} fontSize={0.15} color="#AAAAAA" anchorX="center">
              场景 {i + 1} / {character.scenes.length}
            </Text>
          </group>
          
          {/* Interactive controls hint - 移到底部中央 */}
          <group position={[0, -4, 0]}>
            <Text fontSize={0.18} color="#FFFFFF" anchorX="center">
              左击下一场景 / 右击上一场景
            </Text>
            <mesh 
              position={[0, -0.5, 0]} 
              onClick={nextScene}
              onContextMenu={(e) => {
                if (e.nativeEvent && e.nativeEvent.preventDefault) {
                  e.nativeEvent.preventDefault();
                }
                prevScene();
              }}
              onPointerOver={(e) => e.object.material.opacity = 0.2}
              onPointerOut={(e) => e.object.material.opacity = 0.05}
            >
              <planeGeometry args={[10, 1]} />
              <meshBasicMaterial transparent opacity={0.05} />
            </mesh>
          </group>
          </Suspense>
        </animated.group>
      ))}
    </group>
  );
};

export default CharacterStory;
