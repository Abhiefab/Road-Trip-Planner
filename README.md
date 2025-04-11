# 🗺️ Road Trip Planner

A smart and stylish web application that helps users plan scenic road trips by showing places of interest (like cafes, parks, museums, and tourist spots) along a custom route.

## 🚀 Features

- 📍 Enter any **Start** and **End** location
- 🛣️ Automatically generates the road route using **OpenRouteService**
- 🏞️ Shows **sightseeing places** along the route using **Geoapify**
- ✅ Filter places by category: **Tourist Spots, Cafes, Restaurants, Museums, Parks**
- 📋 View details in a scrollable **side panel**
- 🎨 Clean, responsive, and interactive UI

## 🧩 Technologies Used

- **React.js**
- **Leaflet.js** for maps
- **Geoapify API** for places
- **OpenRouteService API** for route planning
- **CSS** for styling and layout

## 📁 Project Structure

Road-Trip-Planner/ ├── public/ │ └── extra/ │ └── pexels-veeterzy-39811.jpg ├── src/ │ ├── components/ │ │ ├── PlaceFilters.js │ │ ├── PlaceList.js │ │ ├── PlacesPanel.js │ │ ├── PlaceFilters.css │ │ ├── PlaceList.css │ │ └── PlacesPanel.css │ ├── App.js │ ├── App.css │ ├── MapComponent.js │ ├── PlacesAlongRoute.js │ ├── PlacesComponent.js │ └── index.js ├── .gitignore ├── package.json ├── package-lock.json └── webpack.config.js

