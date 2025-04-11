import React from 'react';
import './PlaceList.css';

const PlaceList = ({ places }) => {
  if (!places || places.length === 0) {
    return <p className="no-places">No places found along the route.</p>;
  }

  return (
    <div className="place-list">
      <h2>Recommended Places to Visit</h2>
      <div className="places-container">
        {places.map((place, index) => (
          <div className="place-card" key={index}>
            {place.preview && place.preview.source ? (
              <img src={place.preview.source} alt={place.name} />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <h3>{place.name}</h3>
            <p>{place.wikipedia_extracts?.text || 'No description available.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceList;
