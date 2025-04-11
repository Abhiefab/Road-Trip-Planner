import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';

const categoryMap = {
  parks: 'leisure.park',
  cafes: 'catering.cafe',
  restaurants: 'catering.restaurant',
  museums: 'entertainment.museum',
  tourist: 'tourism.sights',
};

const PlacesAlongRoute = ({ bounds, setPlaces, selectedCategories }) => {
  const [localPlaces, setLocalPlaces] = useState([]);

  useEffect(() => {
    if (!bounds || selectedCategories.length === 0) {
      setLocalPlaces([]);
      setPlaces([]);
      return;
    }

    const [southWest, northEast] = bounds;

    const fetchPlaces = async () => {
      const apiKey = '2e97a0981ed44b0cacb3cece8893f8a1';
      const categoryParams = selectedCategories
        .map(cat => categoryMap[cat])
        .filter(Boolean)
        .join(',');

      const url = `https://api.geoapify.com/v2/places?categories=${categoryParams}&filter=rect:${southWest[1]},${southWest[0]},${northEast[1]},${northEast[0]}&limit=20&apiKey=${apiKey}`;

      try {
        const response = await axios.get(url);
        const features = response.data.features.map(f => ({
          lat: f.geometry.coordinates[1],
          lon: f.geometry.coordinates[0],
          name: f.properties.name || "Unnamed Place",
          preview: f.properties.datasource?.raw?.preview || null,
          wikipedia_extracts: f.properties.datasource?.raw?.wikipedia_extracts || null
        }));

        setLocalPlaces(features);
        setPlaces(features);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [bounds, selectedCategories, setPlaces]);

  return (
    <>
      {localPlaces.map((place, index) => (
        <Marker
          key={index}
          position={[place.lat, place.lon]}
          icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41]
          })}
        >
          <Tooltip direction="top" offset={[0, -30]} permanent>
            {place.name}
          </Tooltip>
          <Popup>
            <strong>{place.name}</strong><br />
            {place.wikipedia_extracts?.text || 'No description available.'}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default PlacesAlongRoute;
