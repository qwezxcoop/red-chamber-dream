import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Box, Cone, Cylinder, Torus, Plane, TorusKnot, Line } from '@react-three/drei';
import * as THREE from 'three';

// --- Helper for subtle, continuous rotation ---
const PoeticRotation = ({ children, speed = 0.1, enabled = true }) => {
    const ref = useRef();
    useFrame((state, delta) => { 
        if(ref.current && enabled) ref.current.rotation.y += delta * speed; 
    });
    return <group ref={ref}>{children}</group>;
}

// --- Enhanced 3D Symbols with more poetic effects ---

const Bamboo = ({ color }) => (
    <PoeticRotation>
        {[...Array(7)].map((_, i) => (
            <group key={i}>
                <Plane args={[0.15, 4]} position={[(i - 3) * 0.6 + (Math.sin(i) * 0.2), 0, (i % 2) * -0.5 + (Math.cos(i) * 0.3)]} rotation-y={Math.sin(i * 2) * 0.3}>
                    <meshStandardMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} emissive={color} emissiveIntensity={0.3} />
                </Plane>
                {/* Add bamboo nodes */}
                <Sphere args={[0.05, 8, 8]} position={[(i - 3) * 0.6, Math.sin(i) * 0.5, (i % 2) * -0.5]}>
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
                </Sphere>
            </group>
        ))}
        {/* Add floating leaves */}
        {[...Array(5)].map((_, i) => (
            <Plane key={`leaf-${i}`} args={[0.3, 0.1]} position={[Math.sin(i * 2) * 2, Math.cos(i * 3) * 1.5, Math.sin(i) * 1]} rotation={[Math.PI/4, i, 0]}>
                <meshStandardMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
            </Plane>
        ))}
    </PoeticRotation>
);

const GoldenLock = ({ color }) => (
    <PoeticRotation speed={0.3}>
        <group>
            <Torus args={[0.8, 0.1, 32, 128]} rotation-x={Math.PI / 2}>
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.4} />
            </Torus>
            {/* Add decorative elements */}
            <Sphere args={[0.15, 16, 16]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </Sphere>
            {/* Floating sparkles */}
            {[...Array(8)].map((_, i) => (
                <Sphere key={i} args={[0.02, 8, 8]} position={[Math.cos(i * Math.PI/4) * 1.2, Math.sin(i * Math.PI/4) * 0.3, Math.sin(i * Math.PI/4) * 1.2]}>
                    <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1} />
                </Sphere>
            ))}
        </group>
    </PoeticRotation>
);

const FlowerMound = ({ color }) => {
    const petalsRef = useRef();
    
    useFrame((state) => {
        if (petalsRef.current) {
            petalsRef.current.children.forEach((petal, i) => {
                petal.rotation.x += Math.sin(state.clock.elapsedTime + i) * 0.002;
                petal.rotation.y += Math.cos(state.clock.elapsedTime + i * 0.5) * 0.003;
                petal.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.001;
            });
        }
    });

    return (
        <PoeticRotation>
            <group>
                <Cone args={[1.5, 0.8, 32]} position={[0, -0.4, 0]}>
                    <meshStandardMaterial color={color} />
                </Cone>
                
                {/* Add scattered petals with gentle animation */}
                <group ref={petalsRef}>
                    {[...Array(15)].map((_, i) => (
                        <Plane key={i} args={[0.25, 0.35]} 
                            position={[
                                Math.sin(i * Math.PI/7.5) * (0.6 + Math.random() * 0.9),
                                0.3 + Math.random() * 0.5,
                                Math.cos(i * Math.PI/7.5) * (0.6 + Math.random() * 0.9)
                            ]}
                            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
                        >
                            <meshStandardMaterial 
                                color="#FF69B4" 
                                transparent 
                                opacity={0.7} 
                                side={THREE.DoubleSide}
                                emissive="#FF1493"
                                emissiveIntensity={0.1}
                            />
                        </Plane>
                    ))}
                </group>
            </group>
        </PoeticRotation>
    );
};

const Snow = ({ color }) => {
    const snowflakesRef = useRef();
    
    useFrame((state) => {
        if (snowflakesRef.current) {
            snowflakesRef.current.children.forEach((snowflake, i) => {
                snowflake.position.y -= 0.01;
                snowflake.position.x += Math.sin(state.clock.elapsedTime + i) * 0.005;
                snowflake.rotation.z += 0.01;
                
                if (snowflake.position.y < -2) {
                    snowflake.position.y = 3;
                    snowflake.position.x = (Math.random() - 0.5) * 10;
                    snowflake.position.z = (Math.random() - 0.5) * 10;
                }
            });
        }
    });

    return (
        <group>
            <Plane args={[15, 15]} rotation-x={-Math.PI / 2} position={[0, -2, 0]}>
                <meshStandardMaterial color={color} transparent opacity={0.9} />
            </Plane>
            
            {/* Add floating snowflakes */}
            <group ref={snowflakesRef}>
                {[...Array(30)].map((_, i) => (
                    <group key={i} position={[
                        (Math.random() - 0.5) * 10,
                        Math.random() * 5 + 1,
                        (Math.random() - 0.5) * 10
                    ]}>
                        <Plane args={[0.15, 0.15]} rotation={[0, 0, Math.random() * Math.PI]}>
                            <meshStandardMaterial 
                                color="#FFFFFF" 
                                transparent 
                                opacity={0.8} 
                                emissive="#FFFFFF"
                                emissiveIntensity={0.2}
                            />
                        </Plane>
                    </group>
                ))}
            </group>
        </group>
    );
};

const Phoenix = ({ color }) => (
    <PoeticRotation speed={0.4}>
        <group>
            {/* Phoenix body */}
            <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
            </Sphere>
            {/* Phoenix wings - more majestic */}
            {[...Array(6)].map((_, i) => (
                <Plane key={i} args={[2.5, 0.3]} 
                    rotation-y={i * Math.PI / 3} 
                    rotation-x={Math.sin(i) * 0.3}
                    position={[Math.cos(i * Math.PI/3) * 0.8, Math.sin(i * 0.5) * 0.5, Math.sin(i * Math.PI/3) * 0.8]}
                >
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} side={THREE.DoubleSide} transparent opacity={0.8} />
                </Plane>
            ))}
            {/* Tail feathers */}
            {[...Array(3)].map((_, i) => (
                <Plane key={`tail-${i}`} args={[0.2, 2]} 
                    position={[0, -0.5 - i * 0.3, -1 - i * 0.2]}
                    rotation-x={Math.PI / 6}
                >
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} side={THREE.DoubleSide} transparent opacity={0.9} />
                </Plane>
            ))}
        </group>
    </PoeticRotation>
);

const Ice = ({ color }) => (
    <PoeticRotation speed={0.1}>
        <group>
            <Box args={[1.5, 1.5, 1.5]}>
                <meshStandardMaterial color={color} transparent opacity={0.7} roughness={0.0} metalness={0.1} />
            </Box>
            {/* Ice crystals */}
            {[...Array(6)].map((_, i) => (
                <Cone key={i} args={[0.1, 0.8, 6]} 
                    position={[
                        Math.cos(i * Math.PI/3) * 1.2,
                        Math.sin(i * Math.PI/3) * 0.3,
                        Math.sin(i * Math.PI/3) * 1.2
                    ]}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
                >
                    <meshStandardMaterial color="#E3F2FD" transparent opacity={0.8} />
                </Cone>
            ))}
        </group>
    </PoeticRotation>
);

const Dream = ({ color }) => (
    <PoeticRotation speed={0.1}>
        <group>
            <Sphere args={[1.5, 32, 32]}>
                <meshStandardMaterial color={color} transparent opacity={0.3} wireframe />
            </Sphere>
            {/* Floating dream fragments */}
            {[...Array(8)].map((_, i) => (
                <Sphere key={i} args={[0.1, 8, 8]} 
                    position={[
                        Math.cos(i * Math.PI/4 + Date.now() * 0.001) * 2,
                        Math.sin(i * Math.PI/4 + Date.now() * 0.001) * 1.5,
                        Math.sin(i * Math.PI/3 + Date.now() * 0.001) * 2
                    ]}
                >
                    <meshStandardMaterial color={color} transparent opacity={0.6} emissive={color} emissiveIntensity={0.5} />
                </Sphere>
            ))}
        </group>
    </PoeticRotation>
);

const PlumBlossom = ({ color }) => (
    <PoeticRotation>
        {[...Array(5)].map((_, i) => (
            <Sphere key={i} args={[0.3, 16, 16]} position={[Math.cos(i * 2 * Math.PI / 5) * 0.6, 0, Math.sin(i * 2 * Math.PI / 5) * 0.6]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </Sphere>
        ))}
    </PoeticRotation>
);

const Mud = ({ color }) => (
    <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color={color} roughness={0.9} />
    </Sphere>
);

const Marionette = ({ color }) => {
    const group = useRef();
    useFrame((state) => {
        if(group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.4;
            group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });
    return (
        <group ref={group}>
            <Sphere position={[0, 0.5, 0]} args={[0.5, 16, 16]}><meshStandardMaterial color={color} roughness={0.8} /></Sphere>
            <Cylinder position={[0, -0.5, 0]} args={[0.3, 0.5, 1, 8]}><meshStandardMaterial color={color} roughness={0.8} /></Cylinder>
            <Line points={[[0, 1, 0], [0, 4, 0]]} color="#ffffff" lineWidth={0.5} />
            <Line points={[[0.4, 0.2, 0], [1, 3, 0]]} color="#ffffff" lineWidth={0.5} />
            <Line points={[[-0.4, 0.2, 0], [-1, 3, 0]]} color="#ffffff" lineWidth={0.5} />
        </group>
    );
};

const Wolf = ({ color }) => (
    <PoeticRotation>
        <Cone args={[0.5, 1.5, 4]}><meshStandardMaterial color={color} /></Cone>
    </PoeticRotation>
);

const Painting = ({ color }) => (
    <Plane args={[2.5, 3.5]} rotation-y={0.2}>
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.9} />
    </Plane>
);

const Buddha = ({ color }) => (
    <PoeticRotation>
        <TorusKnot args={[1, 0.3, 128, 16]}><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} /></TorusKnot>
    </PoeticRotation>
);

const SpinningWheel = ({ color }) => (
    <PoeticRotation speed={0.5}>
        <Cylinder args={[1, 1, 0.1, 8]}><meshStandardMaterial color={color} /></Cylinder>
    </PoeticRotation>
);

const Village = ({ color }) => (
    <group>
        <Box args={[1, 1, 1]} position={[-1, 0, 0]}><meshStandardMaterial color={color} /></Box>
        <Cone args={[0.7, 1, 4]} position={[1, 0, 0]}><meshStandardMaterial color={color} /></Cone>
    </group>
);

const Orchid = ({ color }) => (
    <PoeticRotation>
        {[...Array(3)].map((_, i) => (
            <Sphere key={i} args={[0.4, 16, 16]} position={[Math.cos(i * 2 * Math.PI / 3) * 0.5, 0, Math.sin(i * 2 * Math.PI / 3) * 0.5]}>
                <meshStandardMaterial color={color} />
            </Sphere>
        ))}
    </PoeticRotation>
);

const Tomb = ({ color }) => (
    <Box args={[1, 1.5, 0.5]}><meshStandardMaterial color={color} /></Box>
);

const Tower = ({ color }) => (
    <Cylinder args={[0.5, 0.8, 3, 6]}><meshStandardMaterial color={color} /></Cylinder>
);

const Kite = ({ color }) => (
    <group rotation-z={0.3}>
        <Plane args={[2, 3]}>
            <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8} />
        </Plane>
        <Plane args={[0.1, 2]} position={[0, -2, 0]}>
            <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.6} />
        </Plane>
    </group>
);

const Ship = ({ color }) => (
    <group>
        <Box args={[2, 0.5, 1]}>
            <meshStandardMaterial color={color} roughness={0.7} />
        </Box>
        <Plane args={[1, 2]} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="#FFFFFF" side={THREE.DoubleSide} transparent opacity={0.8} />
        </Plane>
        <Cylinder args={[0.05, 0.05, 3]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#8B4513" />
        </Cylinder>
    </group>
);

const Pomegranate = ({ color }) => (
    <PoeticRotation>
        <group>
            <Sphere args={[1, 32, 32]}>
                <meshStandardMaterial color={color} />
            </Sphere>
            {[...Array(6)].map((_, i) => (
                <Cone key={i} args={[0.1, 0.3, 4]} 
                    position={[Math.cos(i * Math.PI/3) * 0.3, 1, Math.sin(i * Math.PI/3) * 0.3]}
                >
                    <meshStandardMaterial color="#4CAF50" />
                </Cone>
            ))}
        </group>
    </PoeticRotation>
);

const Bow = ({ color }) => (
    <PoeticRotation>
        <Torus args={[1, 0.05, 8, 50, Math.PI * 1.5]} rotation-z={-Math.PI / 4}>
             <meshStandardMaterial color={color} />
        </Torus>
    </PoeticRotation>
);

const Cloud = ({ color }) => (
    <PoeticRotation>
        <group>
            <Sphere position={[-0.5, 0, 0]} args={[0.8, 32, 32]}>
                <meshStandardMaterial color={color} transparent opacity={0.6} />
            </Sphere>
            <Sphere position={[0.5, 0.2, -0.3]} args={[1, 32, 32]}>
                <meshStandardMaterial color={color} transparent opacity={0.6} />
            </Sphere>
            <Sphere position={[0, 0.5, 0.2]} args={[0.6, 32, 32]}>
                <meshStandardMaterial color={color} transparent opacity={0.6} />
            </Sphere>
        </group>
    </PoeticRotation>
);

const SymbolMap = {
  竹: Bamboo,
  金锁: GoldenLock,
  凤: Phoenix,
  风筝: Kite,
  船: Ship,
  石榴: Pomegranate,
  弓: Bow,
  花冢: FlowerMound,
  雪: Snow,
  冰: Ice,
  云: Cloud,
  海棠: PlumBlossom, // Using PlumBlossom for a more distinct shape
  梅: PlumBlossom,
  泥: Mud,
  木偶: Marionette,
  狼: Wolf,
  画: Painting,
  佛: Buddha,
  纺车: SpinningWheel,
  村庄: Village,
  兰: Orchid,
  墓: Tomb,
  梦: Dream,
  楼: Tower,
};

// --- Main Scene Component ---
const CharacterScene = ({ scene, characterName }) => {
  const SymbolComponent = SymbolMap[scene.symbol] || null;

  return (
    <group position={[0, 0, 0]}>
      {SymbolComponent && <SymbolComponent color={scene.color} />}
      <Text
        position={[0, 3, 0]} // Raised text to avoid overlap
        fontSize={0.4}
        color={scene.color}
        anchorX="center"
        fillOpacity={0.8}
      >
        {scene.poem}
      </Text>
      <Text
        position={[0, -3, 0]} // Lowered text
        fontSize={0.2}
        color="#FFFFFF"
        maxWidth={6}
        textAlign="center"
        anchorX="center"
        fillOpacity={0.6}
      >
        {scene.description}
      </Text>
    </group>
  );
};

export default CharacterScene;