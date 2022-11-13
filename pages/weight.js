import { useSession, signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { CardContainer } from "../components/CardContainer";
import Card from "../components/Card";
import { getAllDays } from "../services/dayService";

import { CanvasContainer } from "../components/CanvasContainer";
import LineChart from "../components/charts/LineChart";

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    const days = await getAllDays(session.user.email);
    return {
      props: { days: JSON.parse(JSON.stringify(days)) },
    };
  } else return { props: {} };
}

export default function WeightPage({ days }) {
  const filteredDays = days.filter((day) => Boolean(day.weights.length > 0));

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
  const title = "Average Weight";

  return (
    <>
      <CardContainer>
        <CanvasContainer>
          <LineChart labels={labels} chartData={meanChartData} title={title} />
        </CanvasContainer>
        {filteredDays.map((filteredDay) => (
          <Card
            key={filteredDay.id}
            date={filteredDay.date}
            weights={filteredDay.weights}
            heights={[]}
            feastTimes={[]}
          />
        ))}
      </CardContainer>
    </>
  );
}
