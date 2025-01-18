import React, { useState } from 'react';
import '../../styles/MissionModal.css';

function MissionModal({ coordinates, closeModal }) {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Mission Creation</h2>
        <button onClick={closeModal} className="close-btn">&times;</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                checked={selectAll} 
                onChange={handleSelectAll} 
              />
            </th>
            <th>Coordinates</th>
            <th>Distance (m)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coordinates.map((coord, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" checked={selectAll} readOnly />
              </td>
              <td>{coord.join(', ')}</td>
              <td>{index > 0 ? (Math.random() * 20).toFixed(1) : '--'}</td>
              <td>
                <button className="action-btn">...</button>
                <div className="action-menu">
                  <div>Insert Polygon before</div>
                  <div>Insert Polygon after</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="generate-btn">Generate Data</button>
    </div>
  );
}

export default MissionModal;