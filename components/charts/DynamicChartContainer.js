import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const ChartComponent = dynamic(() => import('./ChartComponent'), { ssr: false });

const DynamicChartContainer = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/tables/girls0To5Years.json');
      const data = await response.json();

      const labels = data.map((item) => item.Month);

      const datasets = Object.keys(data[0])
        .filter((key) => key !== 'Month')
        .map((key) => {
          return {
            label: key,
            data: data.map((item) => item[key]),
            borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // random color for each line
            fill: false,
          };
        });

      setChartData({
        labels,
        datasets,
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <ChartComponent data={chartData} />
    </div>
  );
};

export default DynamicChartContainer;
