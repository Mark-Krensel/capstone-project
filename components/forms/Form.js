import styled from "styled-components";

export default function Form({ onAddData }) {
  function sendForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { weight, date, height } = Object.fromEntries(formData);

    onAddData(weight, date, height);
  }
  return (
    <FormElement aria-label="Add weight and date" onSubmit={sendForm}>
      <input
        aria-label="date input"
        type="date"
        name="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
      />
      <input
        type="number"
        name="weight"
        min="0"
        max="50"
        step="0.001"
        aria-label="weight input"
      />
      <p>Kg</p>

      <input aria-label="height input" type="number" name="height" />
      <p>cm</p>
      <button type="submit" aria-label="submit weight">
        ok
      </button>
    </FormElement>
  );
}

const FormElement = styled.form`
  background-color: var(--background-secondary);
  border: 1px solid var(--text-secondary);
  color: var(--text-secondary);
  border-radius: 5%;
  box-shadow: 5px 3px 8px grey;
  height: 12em;
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
  }
`;
