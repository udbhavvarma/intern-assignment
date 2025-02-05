import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  CircularProgress,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { Chart } from 'react-chartjs-2';
import { fetchGraphDataOnce, resetGraphData } from '../redux/stocksSlice';
import 'chartjs-adapter-date-fns';
import ChartJS, { TimeScale } from 'chart.js/auto';
ChartJS.register(TimeScale);

function StockGraph() {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.stocks.selectedStock);
  const selectedDuration = useSelector((state) => state.stocks.selectedDuration);
  const graphData = useSelector((state) => state.stocks?.graphData || []);
  const graphComplete = useSelector((state) => state.stocks.graphComplete);
  const [chartType, setChartType] = useState('line');

  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  useEffect(() => {
    if (selectedStock && selectedDuration) {
      dispatch(resetGraphData());
      dispatch(fetchGraphDataOnce({ stockId: selectedStock.id, duration: selectedDuration }));
    }
  }, [dispatch, selectedStock, selectedDuration]);

  useEffect(() => {
    if (!selectedStock || !selectedDuration || graphComplete) return;
    const intervalId = setInterval(() => {
      dispatch(fetchGraphDataOnce({ stockId: selectedStock.id, duration: selectedDuration }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [dispatch, selectedStock, selectedDuration, graphComplete]);

  const lineData = {
    labels: graphData.map((entry) => entry.timestamp),
    datasets: [
      {
        label: 'Line Chart',
        data: graphData.map((entry) => entry.price),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
        pointRadius: 0, 
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: 'Scatter Plot',
        data: graphData.map((entry) => ({ x: entry.timestamp, y: entry.price })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 2,
        autoSkip: true,
      },
    ],
  };

  const commonOptions = {
    plugins: {
      legend: { display: true },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'yyyy-MM-dd HH:mm:ss',
          unit: 'day',
          displayFormats: { day: 'dd MMM yyyy' },
        },
        title: { display: true, text: 'Date' },
        ticks: { autoSkip: true, maxTicksLimit: 10, maxRotation: 45, minRotation: 45 },
      },
      y: {
        title: { display: true, text: 'USD' },
        type: 'linear',
      },
    },
  };

  const prices = graphData.map((entry) => entry.price);
  const minPrice = prices.length ? Math.min(...prices) : null;
  const maxPrice = prices.length ? Math.max(...prices) : null;

  if (!selectedStock || !selectedDuration) {
    return <Box mt={2} textAlign="center">Please select a stock and a duration.</Box>;
  }

  return (
    <Box mt={4}>
      {graphData.length === 0 ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <ToggleButtonGroup
              value={chartType}
              exclusive
              onChange={handleChartTypeChange}
              aria-label="chart type"
              size="small"
            >
              <ToggleButton value="line" aria-label="Line Chart">
                Line
              </ToggleButton>
              <ToggleButton value="scatter" aria-label="Scatter Plot">
                Scatter
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1" color="textSecondary">
              Lowest: ${minPrice ? minPrice.toFixed(2) : 'N/A'}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Highest: ${maxPrice ? maxPrice.toFixed(2) : 'N/A'}
            </Typography>
          </Box>

          <Box>
            {chartType === 'line' ? (
              <Chart type="line" data={lineData} options={commonOptions} />
            ) : (
              <Chart type="scatter" data={scatterData} options={commonOptions} />
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default StockGraph;
