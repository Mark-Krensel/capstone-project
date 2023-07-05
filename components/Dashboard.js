import styled from 'styled-components';
import { Button } from './Button';
import { useRouter } from 'next/router';
import { AttributeBoard } from './AttributeBoard';

export default function Dashboard({ date, id, weight, handleDelete, height, feastTime }) {
  const { pathname } = useRouter();

  function calcTime(timeStamp) {
    const h = Math.floor((timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
            <DateStamp>
              {new Date(parseInt(weight.timeStamp)).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
              {new Date(parseInt(weight.timeStamp)).toLocaleString(undefined, {
                month: 'numeric',
                day: 'numeric',
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
              {new Date(parseInt(height.timeStamp)).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
              {new Date(parseInt(height.timeStamp)).toLocaleString(undefined, {
                month: 'numeric',
                day: 'numeric',
              })}
            </DateStamp>
          </HeightBoard>
        </>
      )}
      {feastTime && (
        <>
          <FeedingTimeBoard>
            {new Date(parseInt(feastTime.timeStamp)).toLocaleTimeString([], {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
            })}
            h<FoodSourceStamp> -{feastTime.source}-</FoodSourceStamp>
            <TimeStamp>
              <span>
                --
                {feastTime.value.substr(2, 2)}:{feastTime.value.substr(4, 2)}
                min
              </span>
              <InlineRightText>
                {new Date(parseInt(feastTime.timeStamp)).toLocaleDateString('en-US', {
                  weekday: 'short',
                })}
                {new Date(parseInt(feastTime.timeStamp)).toLocaleString(undefined, {
                  month: 'numeric',
                  day: 'numeric',
                })}
              </InlineRightText>
            </TimeStamp>
          </FeedingTimeBoard>
        </>
      )}
    </DashboardCard>
  );
}

const DashboardCard = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: repeat(1fr 4);
  grid-template-rows: repeat(1fr 3);
  grid-template-areas:
    'header header header header'
    'feedingTime feedingTime feedingTime feedingTime'
    'weight weight height height';
  gap: 0.2em 0.2em;
  padding: 0.5em 1em;
  border: 2px solid var(--text-primary);
  color: var(--text-primary);
  border-radius: 1em;
  box-shadow: var(--shadow-elevation);
  backdrop-filter: blur(10px);
  background: var(--background-secondary-blur);
  flex-basis: 80%;
`;

const DashboardHeading = styled.h2`
  font-size: 1.5rem;
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
  right: 1.2em;
`;
const FoodSourceStamp = styled.span`
  text-align: center;
  position: absolute;
  left: 45%;
`;
