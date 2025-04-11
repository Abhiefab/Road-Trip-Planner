// src/components/PlaceFilters.js
import React from 'react';
import './PlaceFilters.css';

const categories = [
  { id: 'tourist', label: 'Tourist Spots' },
  { id: 'parks', label: 'Parks' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'cafes', label: 'Cafes' },
  { id: 'museums', label: 'Museums' },
];

const PlaceFilters = ({ selectedCategories, onChange }) => {
  const handleCheckboxChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="place-filters">
      <strong>Filter by:</strong>
      {categories.map((cat) => (
        <label key={cat.id}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat.id)}
            onChange={() => handleCheckboxChange(cat.id)}
          />
          {cat.label}
        </label>
      ))}
    </div>
  );
};

export default PlaceFilters;
