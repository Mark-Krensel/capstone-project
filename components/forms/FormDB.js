import styled from "styled-components";
import { useState } from "react";
import SvgCheck from "../icons/Check";

//----- import dynamic component to not get hydration error -----
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Button } from "../Button";
import Image from "next/image";
const DynamicStopwatch = dynamic(() => import("./Stopwatch"), {
  ssr: false,
});

export default function Form({ onSubmit }) {
  const [stoppedTime, setStoppedTime] = useState();

  function sendForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { weight, date, height, feastTime } = Object.fromEntries(formData);
    const weightInput = event.target.weight.value;
    const heightInput = event.target.height.value;
    const timeInput = event.target.feastTime.value;

    if (weightInput == "" && heightInput == "") {
      alert("empty");
      return false;
    }

    onSubmit({ weight, date, height, feastTime });
    event.target.reset();
  }

  return (
    <FormElement aria-label="Add weight and date" onSubmit={sendForm}>
      <input
        aria-label="date input"
        type="date"
        name="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        max={new Date().toISOString().slice(0, 10)}
        min="2021-01-01"
        required
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

      <input
        aria-label="height input"
        type="number"
        name="height"
        min="0"
        max="200"
        step="0.1"
      />
      <p>cm</p>
      <input type="hidden" value={stoppedTime} name="feastTime" />
      <Suspense fallback={`Loading...`}>
        <DynamicStopwatch
          setStoppedTime={setStoppedTime}
          stoppedTime={stoppedTime}
        />
      </Suspense>

      <CheckButton>
        <SvgCheck width={40} height={40} alt="check" />
      </CheckButton>
    </FormElement>
  );
}

const FormElement = styled.form`
  background: var(--background-secondary-blur);
  border: 1px solid var(--text-secondary);
  color: var(--text-secondary);
  border-radius: 5%;
  box-shadow: var(--shadow-elevation);
  backdrop-filter: blur(10px);
  height: 12em;
  width: 12em;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 0.5em;
  padding: 1em;
  margin: 0 auto;

  input {
    width: 8em;
    max-height: 2em;
    border-radius: 5px;
  }

  p {
    max-height: 2em;
    position: relative;
    margin: 0 10% 0 0;
  }
`;

const CheckButton = styled(Button)`
  position: absolute;
  bottom: 0.8em;
  right: 0.5em;
  color: #51bd7c;
`;
