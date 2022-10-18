import styled from "styled-components";

export default function Card({ date, id, weight }) {
  return (
    <CardElement>
      <p>Date: {date}</p>
      <p>Weight: {weight}</p>
    </CardElement>
  );
}

const CardElement = styled.article`
  padding: 0 0.5em;
  border: 1px grey solid;
  background-color: lightgrey;
  border-radius: 4%;
  box-shadow: 5px 3px 1px grey;
  height: 100px;
  width: 200px;
`;
