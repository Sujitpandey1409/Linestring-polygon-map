import React, { useState } from 'react';
import Map from './components/Map';
import MissionModal from './components/Modals/MissionModal';
import './styles/Map.css';

function App() {
  const [coordinates, setCoordinates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <h1>Linestring and Polygon Drawer</h1>
      {isModalOpen && (
        <MissionModal 
          coordinates={coordinates} 
          setCoordinates={setCoordinates}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <Map setCoordinates={setCoordinates} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

export default App;