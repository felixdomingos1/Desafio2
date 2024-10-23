import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup as MapPopup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Ícone do marcador do Leaflet
const DefaultIcon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapSection = ({ location }) => {
  const defaultPosition = [-8.9087707, 13.3202914]; // Coordenadas padrão
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    if (location) {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
          );
          const data = response.data[0]; 
          if (data) {
            setPosition([data.lat, data.lon]); 
          } else {
            setPosition(defaultPosition); // Se não encontrar, usa as coordenadas padrão
          }
        } catch (error) {
          console.error('Erro ao obter coordenadas:', error);
          setPosition(defaultPosition); // Em caso de erro, também usa as coordenadas padrão
        }
      };
      fetchCoordinates();
    } else {
      setPosition(defaultPosition); 
    }
  }, [location]);

  return (
    <div className="map-section">
      <h2 className="text-2xl font-bold text-center mb-4">Localização: {location || 'LUZ Kabir'}</h2>
      <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <MapPopup>{location || 'LUZ Kabir'}</MapPopup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapSection;
