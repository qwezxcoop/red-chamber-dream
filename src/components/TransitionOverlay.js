
import React from 'react';

const TransitionOverlay = ({ isVisible }) => {
  return (
    <div
      className="transition-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    />
  );
};

export default TransitionOverlay;
