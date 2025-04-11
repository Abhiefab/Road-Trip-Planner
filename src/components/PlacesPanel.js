// src/components/PlacesPanel.js
import React from 'react';
import './PlacesPanel.css';

const PlacesPanel = ({ places }) => {
  return (
    <div className="places-panel">
      <h2>Places to Visit</h2>
      {places.map((place, i) => {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(place.name)}`;
        return (
          <div key={i} className="place-card no-image">
            <div className="place-info">
              <h4
                title="Click to search on Google"
                style={{ cursor: 'pointer', color: '#0077cc' }}
                onClick={() => window.open(googleSearchUrl, '_blank')}
              >
                {place.name}
              </h4>
              <p>{place.category}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlacesPanel;
