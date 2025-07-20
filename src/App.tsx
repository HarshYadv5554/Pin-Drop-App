import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import PinList from './components/PinList';
import PinForm from './components/PinForm';
import { Pin, PinFormData } from './types';
import { fetchAddress } from './utils/geocoding';
import { savePinsToStorage, loadPinsFromStorage } from './utils/storage';
import './App.css';

function App() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pendingPin, setPendingPin] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const savedPins = loadPinsFromStorage();
    setPins(savedPins);
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      savePinsToStorage(pins);
    }
  }, [pins, hasLoaded]);

  const handleMapClick = (lat: number, lng: number) => {
    setPendingPin({ lat, lng });
    setIsFormOpen(true);
  };

  const handlePinFormSubmit = async (formData: PinFormData) => {
    if (!pendingPin) return;
    setIsLoading(true);
    try {
      const address = await fetchAddress(pendingPin.lat, pendingPin.lng);
      const newPin: Pin = {
        id: Date.now().toString(),
        lat: pendingPin.lat,
        lng: pendingPin.lng,
        remarks: formData.remarks,
        address,
        createdAt: new Date(),
      };
      setPins(prevPins => [...prevPins, newPin]);
      setIsFormOpen(false);
      setPendingPin(null);
    } catch (error) {
      console.error('Error creating pin:', error);
      alert('Failed to create pin. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinFormCancel = () => {
    setIsFormOpen(false);
    setPendingPin(null);
  };

  const handlePinClick = (pin: Pin) => {
    setSelectedPinId(pin.id);
  };

  const handlePinDelete = (pinId: string) => {
    if (window.confirm('Are you sure you want to delete this pin?')) {
      setPins(prevPins => prevPins.filter(pin => pin.id !== pinId));
      if (selectedPinId === pinId) {
        setSelectedPinId(undefined);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all pins? This action cannot be undone.')) {
      setPins([]);
      setSelectedPinId(undefined);
    }
  };

  return (
    <div className="app">
      <PinList
        pins={pins}
        onPinClick={handlePinClick}
        onPinDelete={handlePinDelete}
        onClearAll={handleClearAll}
        selectedPinId={selectedPinId}
      />
      <Map
        pins={pins}
        onMapClick={handleMapClick}
        onPinDelete={handlePinDelete}
        selectedPinId={selectedPinId}
        center={selectedPinId ? 
          pins.find(p => p.id === selectedPinId)?.lat && pins.find(p => p.id === selectedPinId)?.lng ? 
            [pins.find(p => p.id === selectedPinId)!.lat, pins.find(p => p.id === selectedPinId)!.lng] as [number, number] : 
            undefined : 
          undefined
        }
      />
      <PinForm
        isOpen={isFormOpen}
        onSubmit={handlePinFormSubmit}
        onCancel={handlePinFormCancel}
        loading={isLoading}
      />
    </div>
  );
}

export default App;
