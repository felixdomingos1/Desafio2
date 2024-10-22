// src/components/map/MapSection.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Ícone do marcador do Leaflet
const DefaultIcon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapSection = () => {
  // Coordenadas do LUZ Kabir
  const position = [-8.9087707, 13.3202914];

  return (
    <div className="map-section">
      <h2 className="text-2xl font-bold text-center mb-4">Localização do LUZ Kabir</h2>
      <MapContainer center={position} zoom={17} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Luz Kabir
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapSection;
