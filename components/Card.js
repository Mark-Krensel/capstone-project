import styled from "styled-components";
import { Button } from "./Button";
import Delete from "./icons/Delete";
import X from "./icons/X";
import { useRouter } from "next/router";

export default function Card({
  date,
  id,
  weights,
  handleDelete,
  heights,
  feastTimes,
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
    <CardElement>
      {pathname === "/" && (
        <DeleteButton aria-label="delete data" onClick={() => handleDelete(id)}>
          <Delete fontSize="1.5em" alt="delete" />
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
                {pathname === "/" && (
                  <DeleteSingleButton
                    aria-label="delete single data point"
                    onClick={() => handleDelete(id, weight._id, "weights")}
                  >
                    <X fontSize="1.5em" alt="delete single data point" />
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
                {pathname === "/" && (
                  <DeleteSingleButton
                    aria-label="delete single data point"
                    onClick={() => handleDelete(id, height._id, "heights")}
                  >
                    <X fontSize="1.5em" alt="delete single data point" />
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
                {feastTime.value.substr(2, 2)}:{feastTime.value.substr(4, 2)}{" "}
                min
                {pathname === "/" && (
                  <DeleteSingleButton
                    aria-label="delete single data point"
                    onClick={() =>
                      handleDelete(id, feastTime._id, "feastTimes")
                    }
                  >
                    <X fontSize="1.5em" alt="delete single data point" />
                  </DeleteSingleButton>
                )}
                <TimeStamp> --{calcTime(feastTime.timeStamp)}</TimeStamp>
              </li>
            ))}
          </AttributeList>
        </>
      )}
    </CardElement>
  );
}

const CardElement = styled.article`
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
  margin: 0.2em 1em;
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
  }
`;
const TimeStamp = styled.p`
  text-align: right;
  font-size: 1rem;
  color: var(--not-black);
`;
