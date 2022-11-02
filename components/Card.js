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

  return (
    <CardElement>
      {pathname === "/" && (
        <DeleteButton aria-label="delete data" onClick={() => handleDelete(id)}>
          <Delete height={20} width={20} alt="delete" />
        </DeleteButton>
      )}
      <p>Date: {date}</p>
      {weight &&
        weight.map((entry) => {
          <p>Weight: {entry}</p>;
        })}
      {height &&
        height.map((entry) => {
          <p>Height: {entry}</p>;
        })}
      {feastTime &&
        feastTime.map((entry) => {
          <p>
            Nurse time: {entry.substr(0, 2)}:{entry.substr(2, 2)}:
            {entry.substr(4, 2)}
          </p>;
        })}
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
