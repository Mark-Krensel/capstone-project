import styled from "styled-components";
import { Button } from "./Button";
import { useRouter } from "next/router";

export default function Dashboard({
  date,
  id,
  weight,
  handleDelete,
  height,
  feastTime,
}) {
  const { pathname } = useRouter();

  function calcTime(timeStamp) {
    const h = Math.floor(
      (timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const m = Math.floor((timeStamp % (1000 * 60 * 60)) / (1000 * 60));
    const time = ` @${h}:${m}h`;
    return time;
  }

  return (
    <DashboardCard>
      <DashboardHeading>Status</DashboardHeading>
      {weight && (
        <>
          <AttributeText>Weight</AttributeText>
          <AttributeList>
            <li>{weight.value} kg</li>
          </AttributeList>
        </>
      )}
      {height && (
        <>
          <AttributeText>Weight</AttributeText>
          <AttributeList>
            <li>{height.value} kg</li>
          </AttributeList>
        </>
      )}
      {feastTime && (
        <>
          <AttributeText>Feeding Time</AttributeText>

          <AttributeList>
            <li>
              {feastTime.value.substr(2, 2)}:{feastTime.value.substr(4, 2)}
              min
              <TimeStamp> --{calcTime(feastTime.timeStamp)}</TimeStamp>
            </li>
          </AttributeList>
        </>
      )}
    </DashboardCard>
  );
}

const DashboardCard = styled.article`
  padding: 0.5em;
  border: 1px solid var(--text-primary);
  color: var(--text-primary);
  border-radius: 1em;
  box-shadow: var(--shadow-elevation);
  height: auto;
  max-height: auto;
  width: 85%;
  max-width: 30em;
  backdrop-filter: blur(10px);
  background: var(--background-secondary-blur);
`;

const AttributeText = styled.h3`
  text-align: center;
  border-top: 1px var(--not-white) solid;
  margin: 0.2em 0.6em;
  padding-top: 0.5em;
  font-size: 1.3em;
`;

const DashboardHeading = styled.h2`
  text-align: center;
  font-weight: bold;
  padding-bottom: 0.2em;
`;

const AttributeList = styled.ul`
  margin: 0 1em;

  li {
    font-size: 1.3rem;
    margin: 0.3em 0;
  }
`;
const TimeStamp = styled.p`
  text-align: left;
  font-size: 1rem;
  color: var(--not-black);
  margin-bottom: 1em;
`;
