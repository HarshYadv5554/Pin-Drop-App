import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Pin } from '../types';
import './Map.css';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

interface MapProps {
  pins: Pin[];
  onMapClick: (lat: number, lng: number) => void;
  onPinDelete?: (pinId: string) => void;
  selectedPinId?: string;
  center?: [number, number];
  zoom?: number;
}

const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMloiIGZpbGw9IiMyMTk2RjMiLz4KPHBhdGggZD0iTTEyIDZDNi40OCA2IDIgMTAuNDggMiAxNkMyIDIxLjUyIDYuNDggMjYgMTIgMjZDMjEuNTIgMjYgMjYgMjEuNTIgMjYgMTZDMjYgMTAuNDggMjEuNTIgNiAxMiA2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEyIDEwQzE0LjIwOTEgMTAgMTYgMTEuNzkwOSAxNiAxNEMxNiAxNi4yMDkxIDE0LjIwOTEgMTggMTIgMThDOS43OTA5IDE4IDggMTYuMjA5MSA4IDE0QzggMTEuNzkwOSA5Ljc5MDkgMTAgMTIgMTBaIiBmaWxsPSIjMjE5NkYzIi8+Cjwvc3ZnPgo=',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const MapClickHandler: React.FC<{ onMapClick: (lat: number, lng: number) => void }> = ({ onMapClick }) => {
  const map = useMap();
  useEffect(() => {
    const handleClick = (e: any) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    };
    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onMapClick]);
  return null;
};

const MapViewUpdater: React.FC<{ center?: [number, number]; zoom?: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [map, center, zoom]);
  return null;
};

const Map: React.FC<MapProps> = ({ 
  pins, 
  onMapClick, 
  onPinDelete, 
  selectedPinId, 
  center = [51.505, -0.09], 
  zoom = 13 
}) => {
  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={onMapClick} />
        <MapViewUpdater center={center} zoom={zoom} />
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.lat, pin.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="marker-popup">
                <div className="marker-popup-header">
                  <h4>Pin Details</h4>
                  {onPinDelete && (
                    <button
                      className="marker-delete-btn"
                      onClick={() => onPinDelete(pin.id)}
                      title="Delete pin"
                    >
                      ×
                    </button>
                  )}
                </div>
                {pin.remarks && (
                  <p><strong>Remarks:</strong> {pin.remarks}</p>
                )}
                <p><strong>Address:</strong> {pin.address}</p>
                <p><strong>Coordinates:</strong> {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}</p>
                <p><strong>Created:</strong> {new Date(pin.createdAt).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map; 