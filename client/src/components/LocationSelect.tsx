// components/LocationSelect.tsx
import React, { useState } from 'react';
import Select from 'react-select';
//import { indianStateOptions } from './indianStates';
import type { SingleValue } from 'react-select';

export const indianStatesAndUTs: string[] = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export const indianStateOptions = [
  { value: '__use_current__', label: '📍 Use My Current Location' },
  ...indianStatesAndUTs.map(state => ({
    value: state,
    label: state,
  }))
];



interface Props {
  onLocationChange: (value: string) => void;
}

const LocationSelect: React.FC<Props> = ({ onLocationChange }) => {
  const [currentState, setCurrentState] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchCurrentState = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported!');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        const state = data.address.state || data.address.county || data.address.region;
        if (state) {
          setCurrentState(state);
          onLocationChange(state);
        } else {
          alert('Could not determine state from geolocation.');
        }
      } catch {
        alert('Failed to fetch location.');
      } finally {
        setLoading(false);
      }
    });
  };

  const handleChange = (option: SingleValue<{ value: string; label: string }>) => {
    if (!option) return;
    if (option.value === '__use_current__') {
      fetchCurrentState();
    } else {
      setCurrentState(option.value);
      onLocationChange(option.value);
    }
  };

  return (
    <div>
      <Select
        options={indianStateOptions}
        onChange={handleChange}
        isClearable
        placeholder="Select your state or UT"
        isDisabled={loading}
      />
      {loading && <p className="text-sm text-gray-500 mt-1">Detecting current location…</p>}
      {currentState && (
        <p className="text-sm text-green-600 mt-1">
          Selected state: <strong>{currentState}</strong>
        </p>
      )}
    </div>
  );
};

export default LocationSelect;
