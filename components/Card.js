import styled from 'styled-components';
import { Button } from './Button';
import { ColorRoundCase } from './ColorRoundCase';
import { SrOnly } from './SrOnly';
import Delete from './icons/Delete';
import X from './icons/X';
import { useRouter } from 'next/router';

export default function Card({ date, id, weights, handleDelete, heights, feastTimes, diaperColors }) {
  const { pathname } = useRouter();

  // function calcTime(timeStamp) {
  //   const h = Math.floor((timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   const m = Math.floor((timeStamp % (1000 * 60 * 60)) / (1000 * 60));
  //   const time = ` @${h}:${m}h`;
  //   return time;
  // }

  const parseTime = (timeInMilli) => {
    const parsedTime = new Date(parseInt(timeInMilli)).toLocaleTimeString([], {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    return parsedTime;
  };

  return (
    <CardElement>
      {pathname === '/' && (
        <DeleteButton aria-label="delete data" onClick={() => handleDelete(id)}>
          <Delete fontSize="1.5em" alt="bin" />
        </DeleteButton>
      )}
      <DateText>{date}</DateText>
      {weights.length !== 0 && (
        <>
          <AttributeText>Weight</AttributeText>
          <AttributeList>
            {weights.map((weight) => (
              <li key={weight._id}>
                {weight.value} kg
                {pathname === '/' && (
                  <DeleteSingleButton
                    aria-label="delete single data point"
                    onClick={() => handleDelete(id, weight._id, 'weights')}
                  >
                    <X fontSize="1.5em" alt="x" />
                  </DeleteSingleButton>
                )}
              </li>
            ))}
          </AttributeList>
        </>
      )}
      {heights.length !== 0 && (
        <>
          <AttributeText>Height</AttributeText>
          <AttributeList>
            {heights.map((height) => (
              <li key={height._id}>
                {height.value} cm
                {pathname === '/' && (
                  <DeleteSingleButton
                    aria-label="delete single data point"
                    onClick={() => handleDelete(id, height._id, 'heights')}
                  >
                    <X fontSize="1.5em" alt="x" />
                  </DeleteSingleButton>
                )}
              </li>
            ))}
          </AttributeList>
        </>
      )}
      {feastTimes.length !== 0 && (
        <>
          <AttributeText>Feeding Time</AttributeText>

          <AttributeList>
            {feastTimes.map((feastTime) => (
              <li key={feastTime._id}>
                {feastTime.value.substr(2, 2)}:{feastTime.value.substr(4, 2)}
                min
                <FoodSourceStamp> -{feastTime.source}-</FoodSourceStamp>
                {pathname === '/' && (
                  <DeleteSingleButton
                    aria-label="delete single data point"
                    onClick={() => handleDelete(id, feastTime._id, 'feastTimes')}
                  >
                    <X fontSize="1.5em" alt="x" />
                  </DeleteSingleButton>
                )}
                <TimeStamp>
                  {/* --{calcTime(feastTime.timeStamp)} */}
                  --
                  {new Date(parseInt(feastTime.timeStamp)).toLocaleTimeString([], {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  h
                </TimeStamp>
              </li>
            ))}
          </AttributeList>
        </>
      )}
      {diaperColors.length !== 0 && (
        <>
          <AttributeText>Diaper Color</AttributeText>
          <AttributeColorList>
            {diaperColors.map((diaperColor) => (
              <AttributeColorListItem key={diaperColor._id}>
                {pathname === '/' && (
                  <DeleteSingleColor
                    inputColor={diaperColor.value}
                    aria-label="delete single data point"
                    onClick={() => handleDelete(id, diaperColor._id, 'diaperColors')}
                  >
                    <X fontSize="1.5em" alt="delete" />
                  </DeleteSingleColor>
                )}
                <ColorRoundCase inputColor={diaperColor.value}>
                  {/* ToDo swap hex number for color name */}
                  <SrOnly>{diaperColor.value}</SrOnly>
                </ColorRoundCase>
                <TimeStamp>{parseTime(diaperColor.timeStamp)}h</TimeStamp>
              </AttributeColorListItem>
            ))}
          </AttributeColorList>
        </>
      )}
    </CardElement>
  );
}

const CardElement = styled.article`
  position: relative;
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

const DeleteButton = styled(Button)`
  position: absolute;
  right: 1.1em;
  top: 0.6em;
`;

const DeleteSingleButton = styled(Button)`
  position: absolute;
  right: 0.8em;
`;

const AttributeText = styled.h3`
  text-align: center;
  border-top: 1px var(--not-white) solid;
  margin: 0.2em 0.6em;
  padding-top: 0.5em;
  font-size: 1.3em;
`;

const DateText = styled.h2`
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

// --------------  FeedingTime styled components ------------------

const TimeStamp = styled.p`
  text-align: left;
  font-size: 1rem;
  color: var(--not-black);
  margin-bottom: 1em;
`;

const FoodSourceStamp = styled.span`
  text-align: center;
  position: absolute;
  left: 43%;
`;

// -------------- DiaperColor styled components ------------------

const AttributeColorList = styled.ul`
  display: flex;
  gap: 3em;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 1em;
`;

const AttributeColorListItem = styled.li`
  position: relative;
  font-size: 1.3rem;
  margin: 0.3em 0 0.3em 0;
  gap: 1em;
`;

const DeleteSingleColor = styled(Button)`
  position: absolute;
  padding: 0;
  right: -0.6em;
  top: -0.2em;
  border: 2px solid var(--not-black);
  border-radius: 50%;
  height: 1.5em;
  width: 1.5em;
  background-color: var(--not-white);
`;
