import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { setSelectedStock } from '../redux/stocksSlice';

function StockSelector() {
  const dispatch = useDispatch();
  const stocksList = useSelector((state) => state.stocks.stocksList);
  const selectedStock = useSelector((state) => state.stocks.selectedStock);

  const handleChange = (event) => {
    const stock = stocksList.find((s) => s.id === event.target.value);
    dispatch(setSelectedStock(stock));
  };

  return (
    <FormControl
      variant="outlined"
      size="small"
      sx={{ width: '200px', marginBottom: 2, display: 'flex', justifySelf: 'center', alignContent: 'center' }}
    >
      <InputLabel id="stock-select-label">Stock</InputLabel>
      <Select
        labelId="stock-select-label"
        value={selectedStock ? selectedStock.id : ''}
        label="Stock"
        onChange={handleChange}
      >
        {stocksList.map((stock) => (
          <MenuItem key={stock.id} value={stock.id}>
            {stock.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default StockSelector;
