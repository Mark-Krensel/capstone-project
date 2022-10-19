import styled from "styled-components";

export default function Card({ date, weight }) {
  return (
    <CardElement>
      <p>Date: {date}</p>
      <p>Weight: {weight}</p>
    </CardElement>
  );
}

const CardElement = styled.article`
  padding: 0 0.5em;
  border: 1px var(--text-primary) solid;
  color: var(--text-primary);
  border-radius: 5%;
  box-shadow: 5px 3px 8px grey;
  height: 6em;
  width: 12em;
`;
