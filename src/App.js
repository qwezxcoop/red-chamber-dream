
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import CoverScene from './components/CoverScene';
import CharacterSelectionScene from './components/CharacterSelectionScene';
import CharacterStory from './components/CharacterStory';
import FateMapScene from './components/FateMapScene';
import FlowerPetalTransition from './components/FlowerPetalTransition';
import SnowTransition from './components/SnowTransition';
import ShatterTransition from './components/ShatterTransition';
import { characters } from './data';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('cover');
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('flowerPetals');

  const navigateTo = (view, charIndex = 0) => {
    if (isTransitioning) return;

    if (view === 'fatemap') {
        setCurrentView('fatemap');
        return;
    }

    const character = characters[charIndex];
    const transType = character?.scenes[0]?.transitionType || 'flowerPetals';
    setTransitionType(transType);

    setIsTransitioning(true);
    setTimeout(() => {
      if (view === 'story') {
        setSelectedCharIndex(charIndex);
      }
      setCurrentView(view);
      setIsTransitioning(false);
    }, 3500); // Slower, more deliberate transition
  };

  const handleCoverEnter = () => {
    setTransitionType('flowerPetals');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView('selection');
      setIsTransitioning(false);
    }, 2000);
  }

  const renderScene = () => {
    switch (currentView) {
      case 'cover':
        return <CoverScene onEnter={handleCoverEnter} />;
      case 'selection':
        return <CharacterSelectionScene navigateTo={navigateTo} />;
      case 'story':
        return <CharacterStory charIndex={selectedCharIndex} />;
      case 'fatemap':
        return <FateMapScene />;
      default:
        return null;
    }
  }

  const renderTransition = () => {
    switch(transitionType) {
      case 'flowerPetals':
        return <FlowerPetalTransition isActive={isTransitioning} />;
      case 'snow':
        return <SnowTransition isActive={isTransitioning} />;
      case 'shatter':
        return <ShatterTransition isActive={isTransitioning} />;
      default:
        return <FlowerPetalTransition isActive={isTransitioning} />;
    }
  }

  return (
    <div className="App">
      <div className="ui-overlay">
        {/* Loading hint */}
        {currentView === 'cover' && !isTransitioning && (
          <div style={{ 
            position: 'absolute', 
            bottom: '80px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            color: '#FFFFFF', 
            fontSize: '20px',
            textAlign: 'center',
            zIndex: 100,
            opacity: 0.9,
            textShadow: '0 0 10px rgba(255,255,255,0.5)'
          }}>
            点击 "红楼绘卷" 开始体验
          </div>
        )}
        
        {/* Navigation buttons */}
        {currentView === 'selection' && 
            <button 
                style={{ 
                  position: 'absolute', 
                  top: '40px', 
                  right: '40px', 
                  zIndex: 100,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                onClick={() => navigateTo('fatemap')}
            >
                曲终
            </button>
        }
        {currentView === 'story' && 
          <button 
            style={{ 
              position: 'absolute', 
              top: '40px', 
              right: '40px', 
              zIndex: 100,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onClick={() => navigateTo('selection')}
          >
            返回
          </button>
        }
        
        {/* Transition indicator */}
        {isTransitioning && (
          <div style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#FFFFFF',
            fontSize: '24px',
            textAlign: 'center',
            zIndex: 100,
            opacity: 0.8,
            background: 'rgba(0,0,0,0.3)',
            padding: '20px 40px',
            borderRadius: '10px',
            backdropFilter: 'blur(5px)'
          }}>
            场景切换中...
          </div>
        )}
      </div>
      
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <color attach="background" args={["#111111"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <Suspense fallback={null}>
          {renderScene()}
          {renderTransition()}
        </Suspense>
        <EffectComposer>
            <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default App;
