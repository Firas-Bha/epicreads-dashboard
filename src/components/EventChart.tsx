import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface EventChartProps {
  eventCount: number;
  outOfBoundsCount: number;
  thresholds: { lower: number; upper: number };
}

const EventChart: React.FC<EventChartProps> = ({ eventCount, outOfBoundsCount, thresholds }) => {
  const data = {
    labels: ['Total Events', 'Out of Bounds', 'Lower Threshold', 'Upper Threshold'],
    datasets: [
      {
        label: 'Event Data',
        data: [eventCount, outOfBoundsCount, thresholds.lower, thresholds.upper],
        backgroundColor: ['#8884d8', '#ff4d4f', '#52c41a', '#52c41a'],
        borderColor: ['#4b0082', '#cc0000', '#228b22', '#228b22'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: 250 }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EventChart;
