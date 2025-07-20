import React from 'react';
import { Pin } from '../types';
import './PinList.css';

interface PinListProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
  onPinDelete: (pinId: string) => void;
  onClearAll?: () => void;
  selectedPinId?: string;
}

const PinList: React.FC<PinListProps> = ({ pins, onPinClick, onPinDelete, onClearAll, selectedPinId }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (pins.length === 0) {
    return (
      <div className="pin-list">
        <div className="pin-list-header">
          <h3>Saved Pins</h3>
        </div>
        <div className="pin-list-empty">
          <p>No pins saved yet.</p>
          <p>Click on the map to drop your first pin!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pin-list">
      <div className="pin-list-header">
        <div className="pin-list-header-content">
          <h3>Saved Pins ({pins.length})</h3>
          {pins.length > 0 && onClearAll && (
            <button
              className="clear-all-btn"
              onClick={onClearAll}
              title="Clear all pins"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      <div className="pin-list-content">
        {pins.map((pin) => (
          <div
            key={pin.id}
            className={`pin-item ${selectedPinId === pin.id ? 'selected' : ''}`}
          >
            <div className="pin-item-content" onClick={() => onPinClick(pin)}>
              <div className="pin-item-header">
                <span className="pin-coordinates">
                  {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}
                </span>
                <span className="pin-date">{formatDate(pin.createdAt)}</span>
              </div>
              {pin.remarks && (
                <div className="pin-remarks">
                  <strong>Remarks:</strong> {pin.remarks}
                </div>
              )}
              <div className="pin-address">
                <strong>Address:</strong> {pin.address}
              </div>
            </div>
            <button
              className="pin-delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onPinDelete(pin.id);
              }}
              title="Delete pin"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinList; 