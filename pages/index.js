import { CardContainer } from "../components/CardContainer";
import Card from "../components/Card";
import { getAllDays } from "../services/dayService";

export async function getServerSideProps() {
  const days = await getAllDays();

  return {
    props: { days: days },
  };
}

export default function Home({ days }) {
  return (
    <div>
      <main>
        <CardContainer>
          {days.map((day) => (
            <Card
              key={day.id}
              weight={day.weight}
              date={day.date}
              height={day.height}
            />
          ))}
        </CardContainer>
      </main>
    </div>
  );
}
