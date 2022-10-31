import styled from "styled-components";

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
        X
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
  box-shadow: 5px 3px 8px grey;
  height: auto;
  width: 12em;
`;

const DeleteButton = styled.div`
  cursor: pointer;
  border: 1px solid black;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
`;
