import { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'hammerjs'; // needed for chartjs-plugin-zoom
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart, LineController, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineController, LinearScale, CategoryScale);

const ChartComponent = ({ data, currentWeek }) => {
  const chartRef = useRef();
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = chartRef.current;
      chartInstance.options.plugins.zoom.zoom.rangeMin = { x: 0.5, y: 0.5 };
      chartInstance.options.plugins.zoom.zoom.rangeMax = { x: 0.5, y: 0.5 };
      chartInstance.update();
    }
  }, [chartRef]);

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
    scales: {
      x: {
        min: currentWeek - 4, //starting point for initial zoom
        max: currentWeek, // end point for initial zoom scale
      },
    },
    plugins: {
      zoom: {
        limits: {
          x: { min: 0, max: 70, minRange: 5 },
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

  return <Line ref={chartRef} data={data} options={options} plugins={[zoomPlugin]} />;
};

export default ChartComponent;
