import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { characters } from '../data';

const Star = ({ position, name, index, onSelect, onHover, isHovered }) => {
    const ref = useRef();
    const textRef = useRef();
    const [clicked, setClicked] = useState(false);
    
    // 从characters数据中获取颜色
    const colorPreview = characters[index]?.scenes?.[0]?.color || "#FFFFFF";

    useFrame((state) => {
        if(ref.current) {
            ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index * 2) * 0.15;
            const targetIntensity = isHovered ? 1.0 : (clicked ? 0.8 : 0.3 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1);
            ref.current.material.emissiveIntensity = THREE.MathUtils.lerp(ref.current.material.emissiveIntensity, targetIntensity, 0.1);
            
            const targetScale = isHovered ? 1.4 : (clicked ? 1.2 : 1);
            ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
        }
        if(textRef.current) {
            textRef.current.material.opacity = THREE.MathUtils.lerp(textRef.current.material.opacity, isHovered ? 1 : 0, 0.1);
        }
    });

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => onSelect(index), 500);
    };

    const handlePointerOver = () => {
        onHover(index);
    };

    const handlePointerOut = () => {
        onHover(null);
    };

    return (
        <group position={position}>
            <Sphere 
                ref={ref} 
                args={[0.2, 16, 16]} 
                onPointerOver={handlePointerOver} 
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            >
                <meshStandardMaterial 
                    color={colorPreview || "#FFFFFF"} 
                    emissive={colorPreview || "#FFFFFF"} 
                    emissiveIntensity={0.2} 
                    transparent
                    opacity={0.9}
                />
            </Sphere>
            <Text ref={textRef} position={[0, 0.4, 0]} fontSize={0.3} color="#FFFFFF" anchorX="center" material-transparent material-opacity={0}>
                {name}
            </Text>
        </group>
    );
}

const Nebula = () => {
    const ref = useRef();
    const particles = useMemo(() => {
        const positions = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        if(ref.current) {
            ref.current.rotation.y += delta * 0.01;
            ref.current.rotation.x += delta * 0.005;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry attach="geometry">
                <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial attach="material" color="#4A148C" size={0.01} transparent opacity={0.5} />
        </points>
    );
}

const CharacterSelectionScene = ({ navigateTo }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const groupRef = useRef();
    
    const starPositions = characters.map((_, i) => {
        const angle = (i / characters.length) * Math.PI * 2;
        const radius = 5; // 增大半径，避免重叠
        const height = Math.sin(angle * 3) * 1.5; // 更规律的高度变化
        return [
            Math.cos(angle) * radius, 
            height, 
            Math.sin(angle) * radius
        ];
    });

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001; // Slow rotation of the entire constellation
        }
    });

    return (
        <group ref={groupRef}>
            <Nebula />
            
            {/* Central mystical core */}
            <mesh position={[0, 0, 0]}>
                <icosahedronGeometry args={[0.3, 2]} />
                <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} transparent opacity={0.7} />
            </mesh>
            
            {/* Character stars with enhanced interaction */}
            {characters.map((char, i) => (
                <group key={i}>
                    <Star 
                        position={starPositions[i]} 
                        name={char.name} 
                        index={i} 
                        onSelect={(index) => navigateTo('story', index)}
                        onHover={setHoveredIndex}
                        isHovered={hoveredIndex === i}
                    />
                    
                    {/* Show character's color theme when hovered */}
                    {hoveredIndex === i && (
                        <group position={[starPositions[i][0], starPositions[i][1] + 1, starPositions[i][2]]}>
                            <mesh>
                                <sphereGeometry args={[0.15, 16, 16]} />
                                <meshBasicMaterial color={char.scenes[0].color} transparent opacity={0.6} />
                            </mesh>
                            {/* 角色信息文字 */}
                            <group position={[0, 0.8, 0]}>
                                <Text fontSize={0.2} color="#FFFFFF" anchorX="center">
                                    {char.name}
                                </Text>
                                <Text position={[0, -0.3, 0]} fontSize={0.15} color="#FFD700" anchorX="center">
                                    {char.scenes[0].poem}
                                </Text>
                            </group>
                        </group>
                    )}
                </group>
            ))}
            
            {/* Connection lines between characters - 只显示最近的2个角色连接 */}
            {hoveredIndex !== null && characters.map((char, i) => {
                if (i === hoveredIndex) return null;
                const distance = Math.sqrt(
                    Math.pow(starPositions[hoveredIndex][0] - starPositions[i][0], 2) +
                    Math.pow(starPositions[hoveredIndex][1] - starPositions[i][1], 2) +
                    Math.pow(starPositions[hoveredIndex][2] - starPositions[i][2], 2)
                );
                
                // 只显示最近的连接，减少视觉混乱
                if (distance < 7 && distance > 0) {
                    return (
                        <line key={`connection-${i}`}>
                            <bufferGeometry>
                                <bufferAttribute
                                    attach="attributes-position"
                                    count={2}
                                    array={new Float32Array([
                                        ...starPositions[hoveredIndex],
                                        ...starPositions[i]
                                    ])}
                                    itemSize={3}
                                />
                            </bufferGeometry>
                            <lineBasicMaterial color="#FFD700" transparent opacity={0.4} />
                        </line>
                    );
                }
                return null;
            }).filter(Boolean).slice(0, 2)}
            
            {/* Instructions */}
            <Text position={[0, -6, 0]} fontSize={0.35} color="#FFFFFF" anchorX="center">
                选择一位金陵女子，聆听她的故事
            </Text>
        </group>
    );
};

export default CharacterSelectionScene;