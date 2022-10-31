import { CardContainer } from "../components/CardContainer";
import Card from "../components/Card";
import { getAllDays } from "../services/dayService";

export async function getServerSideProps() {
  const days = await getAllDays();
  return {
    props: { days: days },
  };
}

export default function WeightPage({ days }) {
  return (
    <>
      <p>You will see a graph here soon </p>
      <CardContainer>
        {days
          .filter((day) => Boolean(day.weight))
          .map((filteredDay) => (
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
