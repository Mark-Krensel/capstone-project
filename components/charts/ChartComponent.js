import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'hammerjs'; // needed for chartjs-plugin-zoom
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart, LineController, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineController, LinearScale, CategoryScale);

const ChartComponent = ({ data }) => {
  const colors = {
    purple: {
      default: 'rgba(149, 76, 233, 1)',
      half: 'rgba(149, 76, 233, 0.5)',
      quarter: 'rgba(149, 76, 233, 0.25)',
      zero: 'rgba(149, 76, 233, 0)',
    },
    indigo: {
      default: 'rgba(80, 102, 120, 1)',
      quarter: 'rgba(80, 102, 120, 0.25)',
    },
  };

  const options = {
    plugins: {
      zoom: {
        limits: {
          x: { min: 0, max: 60, minRange: 5 },
          y: { min: 0, max: 35, minRange: 5 },
        },
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return <Line data={data} options={options} plugins={[zoomPlugin]} />;
};

export default ChartComponent;
