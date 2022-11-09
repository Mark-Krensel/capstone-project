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

  return (
    <CardElement>
      {pathname === "/" && (
        <DeleteButton
          aria-label="delete data"
          onClick={() => handleDelete(id, "", "")}
        >
          <Delete height={20} width={20} alt="delete" />
        </DeleteButton>
      )}
      <p>Date: {date}</p>
      {weights.lenght !== 0 && (
        <ul>
          {weights.map((weight) => (
            <li key={weight._id}>
              Weight: {weight.value}
              <Button
                aria-label="delete single data point"
                onClick={() => handleDelete(id, weight._id, "weights")}
              >
                <X height={20} width={20} alt="delete single data point" />
              </Button>
            </li>
          ))}
        </ul>
      )}
      {heights.lenght !== 0 && (
        <ul>
          {heights.map((height) => (
            <li key={height._id}>
              Height: {height.value}
              <Button
                aria-label="delete single data point"
                onClick={() => handleDelete(id, height._id, "heights")}
              >
                <X height={20} width={20} alt="delete single data point" />
              </Button>
            </li>
          ))}
        </ul>
      )}
      {feastTimes.lenght !== 0 && (
        <ul>
          {feastTimes.map((feastTime) => (
            <li key={feastTime._id}>
              Nurse time: {feastTime.value.substr(0, 2)}:
              {feastTime.value.substr(2, 2)}:{feastTime.value.substr(4, 2)}
              <Button
                aria-label="delete single data point"
                onClick={() => handleDelete(id, feastTime._id, "feastTimes")}
              >
                <X height={20} width={20} alt="delete single data point" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </CardElement>
  );
}

const CardElement = styled.article`
  padding: 0.5em;
  border: 1px solid var(--text-primary);
  color: var(--text-primary);
  border-radius: 5%;
  box-shadow: var(--shadow-elevation);
  height: auto;
  max-height: auto;
  width: 12em;
  backdrop-filter: blur(10px);
  background: var(--background-secondary-blur);
`;

const DeleteButton = styled(Button)`
  position: absolute;
  right: 0.2em;
  top: 0.2em;
`;
