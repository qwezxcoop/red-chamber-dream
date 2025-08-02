
import React from 'react';
import { characters } from '../data';

const CharacterSelection = ({ navigateTo }) => {
  return (
    <div className="character-selection">
      <h2>选择人物</h2>
      <div className="character-list">
        {characters.map((char, index) => (
          <button key={index} onClick={() => navigateTo('story', index)}>
            {char.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;
