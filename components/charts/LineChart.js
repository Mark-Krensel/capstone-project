import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const colors = {
  purple: {
    default: "rgba(149, 76, 233, 1)",
    half: "rgba(149, 76, 233, 0.5)",
    quarter: "rgba(149, 76, 233, 0.25)",
    zero: "rgba(149, 76, 233, 0)",
  },
  indigo: {
    default: "rgba(80, 102, 120, 1)",
    quarter: "rgba(80, 102, 120, 0.25)",
  },
};

export default function LineChart({ chartData, labels, title }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: chartData,
        fill: true,
        borderWidth: 2,
        borderColor: colors.purple.half,
        lineTension: 0.3,
        pointBackgroundColor: colors.purple.default,
        pointRadius: 3,
      },
    ],
  };
  return <Line data={data} />;
}
