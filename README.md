# Pin Drop App

A React-based interactive map application that allows users to drop pins, add remarks, and automatically fetch addresses for locations. Pins are saved in the user's browser local storage and persist across sessions.

## Features
- Interactive map interface (OpenStreetMap + React Leaflet)
- Drop pins by clicking on the map
- Add optional remarks to each pin
- Automatic address fetching using Nominatim API
- Pins are saved in browser local storage (persist after refresh)
- Sidebar lists all saved pins with remarks and addresses
- Click a pin in the sidebar to center the map on it
- Delete individual pins or clear all pins
- Responsive, modern UI

## File Structure
```
pin-drop-app/
├── public/                  # Static assets and index.html
├── src/
│   ├── components/          # React components (Map, PinForm, PinList)
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # Utility functions (geocoding, storage)
│   ├── App.tsx              # Main application component
│   ├── App.css              # Main styles
│   ├── index.tsx            # Entry point
│   └── index.css            # Global styles
├── package.json             # Project metadata and dependencies
├── README.md                # Project documentation
└── ...                      # Other config files
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
# Clone the repository
https://github.com/HarshYadv5554/Pin-Drop-App.git
cd Pin-Drop-App

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Click anywhere on the map to drop a pin
- Enter optional remarks in the popup form
- Pins appear in the sidebar with address and remarks
- Click a pin in the sidebar to center the map
- Delete pins individually or clear all pins

