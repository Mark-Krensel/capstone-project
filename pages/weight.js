import Card from "../components/Card";
import styled from "styled-components";
import { getAllDays } from "../services/dayService";

export default function WeightPage() {
  //   const days = await getAllDays();
  return (
    <>
      <p>You will see a graph here soon </p>
      {/* <CardContainer>
        {days.map((day) => (
          <Card
            key={day.id}
            weight={day.weight}
            date={day.date}
            height={day.height}
          />
        ))}
      </CardContainer> */}
    </>
  );
}
const CardContainer = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em;
  margin-top: 3.5em;
`;
