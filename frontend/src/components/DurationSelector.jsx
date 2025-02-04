// src/components/DurationSelector.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import { setSelectedDuration } from '../redux/stocksSlice';

function DurationSelector() {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.stocks.selectedStock);
  const selectedDuration = useSelector((state) => state.stocks.selectedDuration);

  if (!selectedStock || !selectedStock.available) {
    return null;
  }

  const handleDurationChange = (event, newDuration) => {
    if (newDuration !== null) {
      dispatch(setSelectedDuration(newDuration));
    }
  };

  return (
    <Box marginY={2} textAlign="center">
      <ToggleButtonGroup
        value={selectedDuration}
        exclusive
        onChange={handleDurationChange}
        aria-label="available durations"
      >
        {selectedStock.available.map((duration) => (
          <ToggleButton key={duration} value={duration} aria-label={duration}>
            {duration}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

export default DurationSelector;
