import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box } from '@chakra-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyProfitChart = () => {
  const data = [
    150000, 200000, 180000, 22000, 210000, 250000, 23000, 400000, 260000,
    270000, 300000, 320000,
  ];

  const chartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Monthly Profits (PKR)',
        data: data,
        fill: false,
        backgroundColor: '#4682b4',
        borderColor: '#4682b4',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box w="35rem">
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default MonthlyProfitChart;
