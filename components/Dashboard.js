import styled from "styled-components";
import { Button } from "./Button";
import { useRouter } from "next/router";
import { AttributeBoard } from "./AttributeBoard";

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
          <WeightBoard>
            {weight.value} kg
            {/* {new Date(parseInt(weight.timeStamp)).getDate()}.
              {new Date(parseInt(weight.timeStamp)).getMonth() + 1} */}
            <DateStamp>
              {new Date(parseInt(weight.timeStamp)).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                }
              )}
              {new Date(parseInt(weight.timeStamp)).toLocaleString(undefined, {
                month: "numeric",
                day: "numeric",
              })}
            </DateStamp>
          </WeightBoard>
        </>
      )}
      {height && (
        <>
          <HeightBoard>
            {height.value} cm
            <DateStamp>
              {new Date(parseInt(height.timeStamp)).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                }
              )}
              {new Date(parseInt(height.timeStamp)).toLocaleString(undefined, {
                month: "numeric",
                day: "numeric",
              })}
            </DateStamp>
          </HeightBoard>
        </>
      )}
      {feastTime && (
        <>
          <FeedingTimeBoard>
            {feastTime.value.substr(2, 2)}:{feastTime.value.substr(4, 2)}
            min
            <TimeStamp>
              <span>--{calcTime(feastTime.timeStamp)}</span>
              <InlineRightText>
                {new Date(parseInt(feastTime.timeStamp)).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                  }
                )}
                {new Date(parseInt(feastTime.timeStamp)).toLocaleString(
                  undefined,
                  {
                    month: "numeric",
                    day: "numeric",
                  }
                )}
              </InlineRightText>
            </TimeStamp>
          </FeedingTimeBoard>
        </>
      )}
    </DashboardCard>
  );
}

// const DashboardCard = styled.article`
//   padding: 0.5em;
//   border: 1px solid var(--text-primary);
//   color: var(--text-primary);
//   border-radius: 1em;
//   box-shadow: var(--shadow-elevation);
//   height: auto;
//   max-height: auto;
//   width: 85%;
//   max-width: 30em;
//   backdrop-filter: blur(10px);
//   background: var(--background-secondary-blur);
// `;
const DashboardCard = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "header header header header"
    "feedingTime feedingTime feedingTime feedingTime"
    "weight weight height height";
  gap: 0.2em 0.2em;
  padding: 0.5em;
  border: 1px solid var(--text-primary);
  color: var(--text-primary);
  border-radius: 1em;
  box-shadow: var(--shadow-elevation);
  height: auto;
  max-height: 12.5em;
  width: 95%;
  max-width: 32em;
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
  grid-area: header;
  border-bottom: var(--not-white) solid 1px;
`;

const HeightBoard = styled(AttributeBoard)`
  grid-area: height;
  border-left: var(--not-white) solid 1px;
`;
const WeightBoard = styled(AttributeBoard)`
  grid-area: weight;
`;
const FeedingTimeBoard = styled(AttributeBoard)`
  grid-area: feedingTime;
  border-bottom: var(--not-white) solid 1px;
`;

const TimeStamp = styled.p`
  text-align: left;
  font-size: 1rem;
  color: var(--not-black);
  margin-bottom: 1em;
`;

const DateStamp = styled.p`
  text-align: right;
  font-size: 1rem;
  color: var(--not-black);
  margin-bottom: 1em;
`;

const InlineRightText = styled.span`
  position: absolute;
  right: 0.7em;
`;
