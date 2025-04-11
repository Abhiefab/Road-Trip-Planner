// src/MapComponent.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PlacesAlongRoute from './PlacesAlongRoute';
import L from 'leaflet';

const MapComponent = ({ startCity, endCity, setPlaces, selectedCategories }) => {
  const [routeCoords, setRouteCoords] = useState([]);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [bounds, setBounds] = useState(null);

  const GEOCODE_API = "/geocode/search";  // ✅ proxy will forward this
  const ROUTE_API = "/v2/directions/driving-car/geojson";  // ✅ proxy handles this
  const API_KEY = "5b3ce3597851110001cf62485e9289f00c17404fbc22bb019972467a";

  const formatCityName = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "Unknown";

  const fetchCoordinates = async (city) => {
    const res = await fetch(`${GEOCODE_API}?api_key=${API_KEY}&text=${encodeURIComponent(city)}`);
    const data = await res.json();
    return data.features[0]?.geometry.coordinates.reverse(); // [lat, lon]
  };

  const calculateBounds = (coords) => {
    if (!coords.length) return null;

    let minLat = coords[0][0], maxLat = coords[0][0];
    let minLng = coords[0][1], maxLng = coords[0][1];

    coords.forEach(([lat, lng]) => {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    });

    return [
      [minLat, minLng], // southwest
      [maxLat, maxLng]  // northeast
    ];
  };

  const startIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const endIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        setPlaces([]);
        setRouteCoords([]);
        setBounds(null);

        const start = await fetchCoordinates(startCity);
        const end = await fetchCoordinates(endCity);
        if (!start || !end) return;

        setStartCoords(start);
        setEndCoords(end);

        const body = {
          coordinates: [start.slice().reverse(), end.slice().reverse()]
        };

        const res = await fetch(ROUTE_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': API_KEY,
          },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        const coords = data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);
        setRouteCoords(coords);
        setBounds(calculateBounds(coords));
      } catch (err) {
        console.error("Error fetching route:", err);
      }
    };

    fetchRoute();
  }, [startCity, endCity, setPlaces]);

  return (
    startCoords && endCoords ? (
      <MapContainer center={startCoords} zoom={7} style={{ height: "80vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={startCoords} icon={startIcon}>
          <Tooltip direction="top" offset={[0, -20]} permanent>
            {formatCityName(startCity)}
          </Tooltip>
          <Popup>
            <strong>Start:</strong> {formatCityName(startCity)}
          </Popup>
        </Marker>

        <Marker position={endCoords} icon={endIcon}>
          <Tooltip direction="top" offset={[0, -20]} permanent>
            {formatCityName(endCity)}
          </Tooltip>
          <Popup>
            <strong>End:</strong> {formatCityName(endCity)}
          </Popup>
        </Marker>

        <Polyline positions={routeCoords} color="blue" />

        {bounds && (
          <PlacesAlongRoute
            bounds={bounds}
            setPlaces={setPlaces}
            selectedCategories={selectedCategories}
          />
        )}
      </MapContainer>
    ) : <p style={{ textAlign: "center" }}>Loading map...</p>
  );
};

export default MapComponent;
