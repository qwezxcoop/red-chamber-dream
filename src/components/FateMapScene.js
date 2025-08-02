import React, { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { characters } from '../data';

// Define relationships
const relationships = [
    // Core Love Triangle
    { from: "林黛玉", to: "薛宝钗", type: "rivalry", tension: 0.8 },
    { from: "林黛玉", to: "史湘云", type: "friendship", tension: 0.2 },

    // Jia Sisters
    { from: "贾元春", to: "贾探春", type: "family", tension: 0.1 },
    { from: "贾探春", to: "贾迎春", type: "family", tension: 0.1 },
    { from: "贾迎春", to: "贾惜春", type: "family", tension: 0.1 },

    // Connection to Wang Xifeng
    { from: "王熙凤", to: "林黛玉", type: "conflict", tension: 0.6 },
    { from: "王熙凤", to: "巧姐", type: "family", tension: 0.1 },

    // Others
    { from: "秦可卿", to: "王熙凤", type: "intrigue", tension: 0.5 },
    { from: "妙玉", to: "林黛玉", type: "friendship", tension: 0.3 },
];

const CharacterStar = ({ character, position, index, onHover, onSelect, isSelected }) => {
    const meshRef = useRef();
    const textRef = useRef();
    const [isHovered, setIsHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            // 添加悬浮效果
            meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + index) * 0.2;
            
            // 选中时的特殊效果
            if (isSelected) {
                meshRef.current.scale.setScalar(1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
            } else if (isHovered) {
                meshRef.current.scale.setScalar(1.1);
            } else {
                meshRef.current.scale.setScalar(1);
            }
        }
        
        if (textRef.current) {
            textRef.current.material.opacity = isHovered || isSelected ? 1 : 0;
        }
    });

    return (
        <group position={position}>
            <Sphere
                ref={meshRef}
                args={[0.3, 16, 16]}
                onPointerOver={() => {
                    setIsHovered(true);
                    onHover(index);
                }}
                onPointerOut={() => {
                    setIsHovered(false);
                    onHover(null);
                }}
                onClick={() => onSelect(index)}
            >
                <meshStandardMaterial 
                    color={character.scenes[0]?.color || '#FFFFFF'} 
                    emissive={character.scenes[0]?.color || '#FFFFFF'}
                    emissiveIntensity={isSelected ? 0.8 : isHovered ? 0.4 : 0.2}
                    transparent
                    opacity={isSelected ? 1 : 0.9}
                />
            </Sphere>
            
            <Text ref={textRef} position={[0, 0.5, 0]} fontSize={0.2} color="#FFFFFF" anchorX="center" material-transparent material-opacity={0}>
                {character.name}
            </Text>
            
            {(isHovered || isSelected) && (
                <Text position={[0, -0.8, 0]} fontSize={0.15} color="#FFD700" anchorX="center">
                    {character.scenes[1]?.poem || character.scenes[0]?.poem}
                </Text>
            )}
        </group>
    );
};

const FateMapScene = ({ onExit }) => {
    const finalSentenceRef = useRef();
    const [hoveredChar, setHoveredChar] = useState(null);
    const [selectedChar, setSelectedChar] = useState(null);

    const starPositions = characters.map((_, i) => {
        const angle = (i / characters.length) * Math.PI * 2;
        const radius = 6; // 增大半径
        const height = Math.cos(angle * 1.5) * 2; // 更平滑的高度变化
        return new THREE.Vector3(
            Math.cos(angle) * radius, 
            height, 
            Math.sin(angle) * radius
        );
    });

    const characterPositions = characters.reduce((acc, char, i) => {
        acc[char.name] = starPositions[i];
        return acc;
    }, {});

    useFrame(() => {
        if(finalSentenceRef.current) {
            finalSentenceRef.current.material.opacity = THREE.MathUtils.lerp(finalSentenceRef.current.material.opacity, 1, 0.01);
        }
    });

    const handleCharacterHover = (charName) => {
        setHoveredChar(charName);
    };

    const handleCharacterClick = (charName) => {
        setSelectedChar(selectedChar === charName ? null : charName);
    };

    // Filter relationships based on selected character
    const visibleRelationships = selectedChar 
        ? relationships.filter(rel => rel.from === selectedChar || rel.to === selectedChar)
        : relationships;

    return (
        <group>
            {/* Character Stars */}
            {characters.map((char, i) => (
                <group key={i} onClick={() => handleCharacterClick(char.name)}>
                    <CharacterStar 
                        position={starPositions[i]} 
                        character={char}
                        index={i}
                        onHover={handleCharacterHover}
                        isHovered={hoveredChar === char.name}
                        selectedChar={selectedChar}
                    />
                </group>
            ))}

            {/* Relationship Lines */}
            {visibleRelationships.map((rel, i) => {
                const fromPos = characterPositions[rel.from];
                const toPos = characterPositions[rel.to];
                if (!fromPos || !toPos) return null;

                const color = rel.type === 'family' ? "#4CAF50" : 
                             rel.type === 'friendship' ? "#2196F3" : 
                             rel.type === 'rivalry' ? "#FF6B6B" : "#FF9800";

                return (
                    <Line
                        key={i}
                        points={[fromPos, toPos]}
                        color={color}
                        lineWidth={selectedChar ? 3 : 1}
                        dashed={rel.type === 'conflict' || rel.type === 'rivalry'}
                        dashSize={0.3}
                        gapSize={0.1}
                        transparent
                        opacity={selectedChar ? 0.8 : 0.4}
                    />
                );
            })}

            {/* Legend - 移到右上角避免重叠 */}
            <group position={[8, 4, 0]}>
                <Text position={[0, 0.5, 0]} fontSize={0.25} color="#FFFFFF" anchorX="center">
                    金陵十二钗命运图
                </Text>
                <Text position={[0, 0, 0]} fontSize={0.14} color="#4CAF50" anchorX="center">
                    绿线: 亲情
                </Text>
                <Text position={[0, -0.3, 0]} fontSize={0.14} color="#2196F3" anchorX="center">
                    蓝线: 友情
                </Text>
                <Text position={[0, -0.6, 0]} fontSize={0.14} color="#FF6B6B" anchorX="center">
                    红线: 冲突
                </Text>
                <Text position={[0, -0.9, 0]} fontSize={0.14} color="#FFD700" anchorX="center">
                    点击角色查看关系
                </Text>
            </group>

            {/* Final Sentence */}
            <Suspense fallback={null}>
                <Text ref={finalSentenceRef} position={[0, -5, 0]} fontSize={0.4} color="#FFFFFF" material-transparent material-opacity={0} anchorX="center">
                    落了片白茫茫大地真干净。
                </Text>
            </Suspense>
        </group>
    );
};

export default FateMapScene;