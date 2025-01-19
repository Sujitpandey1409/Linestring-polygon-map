import React, { useState } from 'react';
import '../../styles/MissionModal.css';

function MissionModal({ coordinates, closeModal, setCoordinates }) {
    const [selectAll, setSelectAll] = useState(false);
    const [showCoord, setShowCoord] = useState();
    const [selectedRows, setSelectedRows] = useState(new Array(coordinates.length).fill(false));
    const [activeActionIndex, setActiveActionIndex] = useState(null); // Tracks the active row for action pop-up

    const handleSelectAll = () => {
        setSelectAll((prev) => !prev);
        setSelectedRows(new Array(coordinates.length).fill(!selectAll));
    };

    const handleRowSelect = (index) => {
        const updatedRows = [...selectedRows];
        updatedRows[index] = !updatedRows[index];
        setSelectedRows(updatedRows);
    };
    const handleShowCordinate = (index)=>{
        setShowCoord(index)
    }

    const toggleActionMenu = (index) => {
        setActiveActionIndex((prev) => (prev === index ? null : index));
    };

    const handleInsertPolygon = (index, position) => {
        const newPolygon = {
            type: 'Polygon',
            coordinates: [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]], // Dummy polygon coordinates
        };

        const updatedCoordinates = [...coordinates];

        if (position === 'before') {
            updatedCoordinates.splice(index, 0, newPolygon);
        } else if (position === 'after') {
            updatedCoordinates.splice(index + 1, 0, newPolygon);
        }

        setCoordinates(updatedCoordinates);
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
                        <th>WP</th>
                        <th>Coordinates</th>
                        <th>Distance (m)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coordinates.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows[index]}
                                    onChange={() => handleRowSelect(index)}
                                />
                            </td>
                            <td>{String(index + 1).padStart(2, '0')}</td>
                            <td title={item.coordinates.join(', ')}>
                                <div onClick={()=>handleShowCordinate(index)} style={{display:'flex', flexDirection:'column'}}>
                                    {item.type === 'Polygon'
                                        ? `Polygon (${item.coordinates.length} points)`
                                        : `LineString (${item.coordinates.length} points)`}
                                    {showCoord===index&&<div style={{textWrap:'wrap'}}>{item.coordinates.join(', ')}</div>}    
                                </div>
                            </td>
                            <td>{index > 0 ? (Math.random() * 20).toFixed(1) : '--'}</td>
                            <td>
                                <button
                                    className="action-btn"
                                    onClick={() => toggleActionMenu(index)}
                                >
                                    ...
                                </button>
                                {activeActionIndex === index && (
                                    <div className="action-menu">
                                        <div onClick={() => handleInsertPolygon(index, 'before')}>Insert Polygon before</div>
                                        <div onClick={() => handleInsertPolygon(index, 'after')}>Insert Polygon after</div>
                                    </div>
                                )}
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
