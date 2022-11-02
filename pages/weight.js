import { CardContainer } from "../components/CardContainer";
import Card from "../components/Card";
import { getAllDays } from "../services/dayService";

import { CanvasContainer } from "../components/CanvasContainer";
import LineChart from "../components/charts/LineChart";

export async function getServerSideProps() {
  const days = await getAllDays();
  return {
    props: { days: days },
  };
}

export default function WeightPage({ days }) {
  const filteredDays = days.filter((day) => Boolean(day.weight));

  const ascendingFilteredDays = Array.from(filteredDays).reverse();

  const labels = ascendingFilteredDays.map(
    (day) =>
      `${day.date.toString().substr(8, 2)}.${day.date.toString().substr(5, 2)}`
  );
  const chartData = ascendingFilteredDays.map((day) => day.weight);
  const title = "Weight";

  return (
    <>
      <CanvasContainer>
        <LineChart labels={labels} chartData={chartData} title={title} />
      </CanvasContainer>
      <CardContainer>
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
