import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DrugSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Fetch drug suggestions from the API
  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchQuery}`);

        // Log the full response to inspect its structure
        console.log(response.data);

        // Check for existence of drugGroup and conceptGroup
        const suggestionData = response.data.drugGroup?.conceptGroup
          ? response.data.drugGroup.conceptGroup.flatMap(group => group.conceptProperties)
          : [];

        // Log the suggestionData to understand its structure
        console.log(suggestionData);

        // Set suggestions and show dropdown if data is present
        setSuggestions(suggestionData);
        setShowDropdown(suggestionData.length > 0);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowDropdown(false);
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  // Handle selection from the dropdown
  const handleSelect = (drugName) => {
    setShowDropdown(false);
    navigate(`/drug/${drugName}`);
  };

  // Close the dropdown when input loses focus
  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <div className="max-w-lg mx-auto relative">
      <h1 className="text-2xl font-bold mb-4">Drug Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onBlur={handleBlur}
        onFocus={() => setShowDropdown(suggestions.length > 0)}
        placeholder="Search for drugs..."
        className="border rounded p-2 w-full"
      />
      
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
          {suggestions.map((suggestion) => {
            // Check if suggestion has the expected structure
            if (!suggestion || !suggestion.name) {
              return null; // Skip rendering if the structure is not valid
            }
            return (
              <li
                key={suggestion.rxcui}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(suggestion.name)}
              >
                {suggestion.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DrugSearch;
