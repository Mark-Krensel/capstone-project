import Image from "next/image";
import styled from "styled-components";
import { Button } from "./Button";

export default function Card({
  date,
  weight,
  height,
  handleDelete,
  id,
  feastTime,
}) {
  return (
    <CardElement>
      <DeleteButton
        type="button"
        aria-label="delete data"
        onClick={() => handleDelete(id)}
      >
        <Image
          src="/delete.svg"
          height="22px"
          width="22px"
          alt="delete"
          color="green"
        />
      </DeleteButton>
      <p>Date: {date}</p>
      <p>Weight: {weight}</p>
      <p>Height: {height}</p>
      <p>
        Nurse time: {feastTime.substr(0, 2)}:{feastTime.substr(2, 2)}:
        {feastTime.substr(4, 2)}
      </p>
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
`;

const DeleteButton = styled(Button)`
  position: absolute;
  right: 0.2em;
  top: 0.2em;
`;
