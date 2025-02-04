export const getStocks = async () => {
    const response = await fetch('/api/stocks');
    if (!response.ok) {
      throw new Error('Failed to fetch stocks');
    }
    return response.json();
  };
  
  export const postStockGraphData = async (stockId, duration) => {
    const response = await fetch(`/api/stocks/${stockId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duration }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch graph data');
    }
    return response.json();
  };
  