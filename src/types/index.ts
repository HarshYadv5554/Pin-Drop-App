export interface Pin {
  id: string;
  lat: number;
  lng: number;
  remarks: string;
  address: string;
  createdAt: Date;
}

export interface PinFormData {
  remarks: string;
}

export interface MapClickEvent {
  latlng: {
    lat: number;
    lng: number;
  };
} 