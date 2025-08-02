
import React from 'react';

const HomePage = ({ navigateTo }) => {
  return (
    <div className="home-page">
      <h1>红楼绘卷</h1>
      <button onClick={() => navigateTo('selection')}>进入</button>
    </div>
  );
};

export default HomePage;
