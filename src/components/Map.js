import React, { useEffect, useRef, useState } from 'react';
import "ol/ol.css"; // OpenLayers styles
import { Map as OLMap, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { Draw, Modify } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

function Map({setCoordinates, setIsModalOpen}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [vectorSource] = useState(new VectorSource());
//   const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const olMap = new OLMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      view: new View({
        center: [0, 0], // Center of the map (in EPSG:3857 format)
        zoom: 2,
      }),
    });

    setMap(olMap);

    return () => olMap.setTarget(null);
  }, [vectorSource]);

  const startDrawing = (type) => {
    if (!map) return;

    const drawInteraction = new Draw({
      source: vectorSource,
      type: type,
    });

    map.addInteraction(drawInteraction);
    
    drawInteraction.on('drawend', (event) => {
        const coords = event.feature.getGeometry().getCoordinates();
        setCoordinates((prev) => [...prev, coords]);
        setIsModalOpen(true)
      map.removeInteraction(drawInteraction);
    });
  };

  return (
    <div>
      <div className="map-container" ref={mapRef}></div>
      <button onClick={() => startDrawing('LineString')}>Draw LineString</button>
      <button onClick={() => startDrawing('Polygon')}>Draw Polygon</button>
    </div>
  );
}

export default Map;