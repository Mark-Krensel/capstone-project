import { CardContainer } from "../components/CardContainer";
import Card from "../components/Card";
import { getAllDays } from "../services/dayService";

import { CanvasContainer } from "../components/CanvasContainer";
import LineChart from "../components/charts/LineChart";

export async function getServerSideProps() {
  const days = await getAllDays();
  return {
    props: { days: JSON.parse(JSON.stringify(days)) },
  };
}

export default function WeightPage({ days }) {
  const filteredDays = days.filter((day) => Boolean(day.weights));

  const ascendingFilteredDays = Array.from(filteredDays).reverse();

  const labels = ascendingFilteredDays.map(
    (day) =>
      `${day.date.toString().substr(8, 2)}.${day.date.toString().substr(5, 2)}`
  );
  const chartData = ascendingFilteredDays.map((day) =>
    day.weights.map((weight) => weight.value)
  );

  const meanChartData = chartData.map(
    (array) => array.reduce((a, b) => a + b, 0) / array.length
  );
  console.log(meanChartData);
  const title = "Average Weight";

  return (
    <>
      <CanvasContainer>
        <LineChart labels={labels} chartData={meanChartData} title={title} />
      </CanvasContainer>
      <CardContainer>
        {filteredDays.map(
          (filteredDay) => (
            console.log(filteredDay),
            (
              <Card
                key={filteredDay.id}
                date={filteredDay.date}
                weights={filteredDay.weights}
                heights={[]}
                feastTimes={[]}
              />
            )
          )
        )}
      </CardContainer>
    </>
  );
}
