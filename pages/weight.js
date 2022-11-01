import { CardContainer } from "../components/CardContainer";
import Card from "../components/Card";
import { getAllDays } from "../services/dayService";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export async function getServerSideProps() {
  const days = await getAllDays();
  return {
    props: { days: days },
  };
}

export default function WeightPage({ days }) {
  const canvasEl = useRef(null);

  const filteredDays = days.filter((day) => Boolean(day.weight));
  const ascendingFilteredDays = filteredDays.sort((a, b) =>
    a.date > b.date ? 1 : -1
  );

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

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const data = {
      labels: ascendingFilteredDays.map((day) => day.date),
      datasets: [
        {
          backgroundColor: gradient,
          label: "My First Dataset",
          data: ascendingFilteredDays.map((day) => day.weight),
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <>
      <CardContainer>
        <canvas id="myChart" ref={canvasEl} height="200" max-height="250" />
        {filteredDays.map((filteredDay) => (
          <Card
            key={filteredDay.id}
            date={filteredDay.date}
            weight={filteredDay.weight}
          />
        ))}
      </CardContainer>
    </>
  );
}
