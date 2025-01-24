import React from 'react';
import ThreeScene from './components/scene1';
import ShowData from './components/ShowData';


const Home: React.FC = () => {
  return (
    <div>
      <div>
        <ShowData />
      </div>
      <h1>3D Configuration</h1>
      <p>Below is the 3D scene:</p>

      <ThreeScene />
    </div>
  );
};

export default Home;
