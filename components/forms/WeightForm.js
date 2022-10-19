import styled from "styled-components";

export default function WeightForm({ onAddWeight }) {
  function sendForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { weight, date } = Object.fromEntries(formData);

    onAddWeight(weight, date);
  }
  return (
    <WeightFormElement aria-label="Add weight and date" onSubmit={sendForm}>
      <input type="number" name="weight" min="0" step="0.001" />
      <p>Kg</p>
      <input
        type="date"
        name="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
      />
      <button type="submit" aria-label="submit weight">
        ok
      </button>
    </WeightFormElement>
  );
}

const WeightFormElement = styled.form`
  background-color: var(--background-secondary);
  border: 1px var(--text-secondary) solid;
  color: var(--text-secondary);
  border-radius: 5%;
  box-shadow: 5px 3px 8px grey;
  height: 8em;
  width: 12em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 0.5em;
  padding: 1em;
  margin: 0 auto;

  button {
    background-color: var(--background-primary);
    border-radius: 12%;
    height: 2em;
    width: 2em;
  }

  input {
    max-width: 8em;
    max-height: 2em;
    border-radius: 5px;
  }

  p {
    max-height: 2em;
    position: relative;
    bottom: 1em;
  }
`;
