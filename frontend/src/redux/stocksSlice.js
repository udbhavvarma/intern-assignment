import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async () => {
  const response = await fetch('/api/stocks');
  if (!response.ok) {
    throw new Error('Error fetching stocks');
  }
  return response.json();
});


export const fetchGraphDataOnce = createAsyncThunk(
    'stocks/fetchGraphDataOnce',
    async ({ stockId, duration }) => {
      const response = await fetch(`/api/stocks/${stockId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration }),
      });
      if (!response.ok) {
        throw new Error('Error fetching graph data');
      }
      const data = await response.json();
      return {
        entries: data.data,
        complete: data.status === 'COMPLETE',
      };
    }
  );
  
  

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: {
    stocksList: [],
    selectedStock: null,
    selectedDuration: null,
    graphData: [],
    graphComplete: false,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedStock(state, action) {
      state.selectedStock = action.payload;
      state.selectedDuration = null;
      state.graphData = [];
      state.graphComplete = false;
    },
    setSelectedDuration(state, action) {
      state.selectedDuration = action.payload;
      state.graphData = [];
      state.graphComplete = false;
    },
    resetGraphData(state) {
      state.graphData = [];
      state.graphComplete = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocksList = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGraphDataOnce.fulfilled, (state, action) => {
        state.graphData = action.payload.entries;
        state.graphComplete = action.payload.complete;
      })
      
      .addCase(fetchGraphDataOnce.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { setSelectedStock, setSelectedDuration, resetGraphData } = stocksSlice.actions;
export default stocksSlice.reducer;
