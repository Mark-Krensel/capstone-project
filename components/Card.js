import styled from "styled-components";
import { Button } from "./Button";
import Delete from "./icons/Delete";
import { useRouter } from "next/router";

export default function Card({
  date,
  id,
  weight,
  handleDelete,
  height,
  feastTime,
}) {
  const { pathname } = useRouter();
  weight.forEach((element) => console.log(element));
  return (
    <CardElement>
      {pathname === "/" && (
        <DeleteButton aria-label="delete data" onClick={() => handleDelete(id)}>
          <Delete height={20} width={20} alt="delete" />
        </DeleteButton>
      )}
      <p>Date: {date}</p>
      {weight?.[0] && (
        <ul>
          {weight.map((weight, index) => (
            <li key={index}>Weight: {weight} </li>
          ))}
        </ul>
      )}
      {height?.[0] && (
        <ul>
          {height.map((height, index) => (
            <li key={index}>Height: {height} </li>
          ))}
        </ul>
      )}
      {feastTime?.[0] && (
        <ul>
          {feastTime.map((entry, index) => (
            <li key={index}>
              Nurse time: {entry.substr(0, 2)}:{entry.substr(2, 2)}:
              {entry.substr(4, 2)}
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
