# Pin Drop Application

A React-based interactive map application that allows users to drop pins, add remarks, and automatically fetch addresses for locations.

## Features

### 🗺️ Interactive Map Interface
- Clean and responsive map interface using OpenStreetMap tiles
- Click anywhere on the map to drop pins
- Custom styled markers with popup information

### 📍 Pin Management
- Drop pins by clicking on the map
- Add optional remarks for each pin
- Automatic address fetching using Nominatim API
- Persistent storage using localStorage

### 📋 Pin List Sidebar
- View all saved pins in a clean sidebar
- Display pin coordinates, remarks, and addresses
- Click on any pin to navigate to its location on the map
- Visual indication of selected pins

### 💾 Data Persistence
- All pin data is automatically saved to localStorage
- Pins persist across browser sessions and page refreshes
- No data loss when closing or refreshing the application

### 🎨 Modern UI/UX
- Clean, modern interface design
- Responsive layout with sidebar and map
- Smooth animations and transitions
- Intuitive user interactions

## Technology Stack

- **React 18** with TypeScript
- **React Leaflet** for map integration
- **OpenStreetMap** for map tiles
- **Nominatim API** for address geocoding
- **LocalStorage** for data persistence
- **CSS3** for styling

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pin-drop-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

## Usage

1. **Dropping Pins**: Click anywhere on the map to drop a pin
2. **Adding Remarks**: When a pin is dropped, a popup form appears where you can enter optional remarks
3. **Viewing Pins**: All saved pins appear in the sidebar on the left
4. **Navigating to Pins**: Click on any pin in the sidebar to center the map on that location
5. **Viewing Details**: Click on map markers to see detailed information in a popup

## API Usage

The application uses the Nominatim API (OpenStreetMap's geocoding service) to fetch addresses. This is a free service with usage limits:

- Maximum 1 request per second
- User-Agent header is required
- Please respect the usage policy: https://operations.osmfoundation.org/policies/nominatim/

## Project Structure

```
src/
├── components/
│   ├── Map.tsx              # Main map component
│   ├── Map.css              # Map styles
│   ├── PinForm.tsx          # Pin creation form
│   ├── PinForm.css          # Form styles
│   ├── PinList.tsx          # Sidebar pin list
│   └── PinList.css          # List styles
├── types/
│   └── index.ts             # TypeScript interfaces
├── utils/
│   ├── geocoding.ts         # Address fetching utility
│   └── storage.ts           # LocalStorage utilities
├── App.tsx                  # Main application component
├── App.css                  # Application styles
└── index.tsx                # Application entry point
```

## Features Implemented

✅ Interactive map interface  
✅ Pin dropping functionality  
✅ Remarks input via popup form  
✅ Automatic address fetching  
✅ Pin submission and saving  
✅ Saved pins list in sidebar  
✅ Pin navigation (click to center map)  
✅ Local storage persistence  
✅ Responsive design  
✅ TypeScript support  
✅ Modern UI/UX  

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

If you encounter any issues or have questions, please open an issue in the repository.
