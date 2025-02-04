import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import StockSelector from './components/StockSelector';
import DurationSelector from './components/DurationSelector';
import StockGraph from './components/StockGraph';
import { useDispatch } from 'react-redux';
import { fetchStocks } from './redux/stocksSlice';

function App() {
  const dispatch = useDispatch();

  // Fetch the list of available stocks 
  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Stock Data Visualization
      </Typography>
      <StockSelector />
      <DurationSelector />
      <StockGraph />
    </Container>
  );
}

export default App;
