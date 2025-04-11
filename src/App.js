import React, { useState } from 'react';
import MapComponent from './MapComponent';
import PlacesPanel from './components/PlacesPanel';
import PlaceFilters from './components/PlaceFilters';
import './App.css';

function App() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [locations, setLocations] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['tourist']);

  const handlePlanTrip = () => {
    if (start && end) {
      setPlaces([]);
      setLocations({ start, end });
    }
  };

  return (
    <div className="app-container">
      <h2>🗺️ Road Trip Planner</h2>

      {/* 🔄 Input & Filters together */}
      <div className="input-and-filters">
        <div className="input-section">
          <input
            type="text"
            placeholder="Start Location (e.g. Delhi)"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <input
            type="text"
            placeholder="End Location (e.g. Agra)"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <button onClick={handlePlanTrip}>Plan Trip</button>
        </div>

        <PlaceFilters
          selectedCategories={selectedCategories}
          onChange={setSelectedCategories}
        />
      </div>

      <div className="map-container">
        {locations && (
          <MapComponent
            startCity={locations.start}
            endCity={locations.end}
            setPlaces={setPlaces}
            selectedCategories={selectedCategories}
          />
        )}

        {places.length > 0 && <PlacesPanel places={places} />}
      </div>
    </div>
  );
}

export default App;
