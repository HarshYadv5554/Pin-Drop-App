import { Pin } from '../types';

const STORAGE_KEY = 'pinDrop_pins';

export const savePinsToStorage = (pins: Pin[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
  } catch (error) {
    console.error('Error saving pins to storage:', error);
  }
};

export const loadPinsFromStorage = (): Pin[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const pins = JSON.parse(stored);
      const convertedPins = pins.map((pin: any) => {
        try {
          return {
            ...pin,
            createdAt: pin.createdAt ? new Date(pin.createdAt) : new Date()
          };
        } catch (dateError) {
          return {
            ...pin,
            createdAt: new Date()
          };
        }
      });
      return convertedPins;
    }
  } catch (error) {
    console.error('Error loading pins from storage:', error);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  return [];
};

export const deletePinFromStorage = (pinId: string): void => {
  try {
    const currentPins = loadPinsFromStorage();
    const updatedPins = currentPins.filter(pin => pin.id !== pinId);
    savePinsToStorage(updatedPins);
  } catch (error) {
    console.error('Error deleting pin from storage:', error);
  }
}; 