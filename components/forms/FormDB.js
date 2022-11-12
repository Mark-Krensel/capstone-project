import styled from "styled-components";
import { useState } from "react";
import SvgCheck from "../icons/Check";

//----- import dynamic component to not get hydration error -----
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Button } from "../Button";
const DynamicStopwatch = dynamic(() => import("./Stopwatch"), {
  ssr: false,
});

export default function Form({ onSubmit, setShownAttribute, shownAttribute }) {
  const [stoppedTime, setStoppedTime] = useState();

  function sendForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const timeStamp = new Date().getTime();
    const { weight, date, height, feastTime } = Object.fromEntries(formData);

    const weightInput = typeof weight !== "undefined" ? weight : "";
    const heightInput = typeof height !== "undefined" ? height : "";
    const timeInput = typeof feastTime !== "undefined" ? feastTime : "";

    if (weightInput == "" && heightInput == "" && timeInput == "") {
      alert("empty");
      return false;
    }

    onSubmit({ weight, date, height, feastTime, timeStamp });
    setShownAttribute("");
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
      {shownAttribute === "weight" && (
        <input
          placeholder="-- kg --"
          type="number"
          name="weight"
          min="0.01"
          max="50"
          step="0.01"
          aria-label="weight input"
        />
      )}
      {shownAttribute === "height" && (
        <input
          aria-label="height input"
          placeholder="-- cm --"
          type="number"
          name="height"
          min="0.1"
          max="200"
          step="0.1"
        />
      )}
      <input
        type="hidden"
        value={stoppedTime}
        defaultValue={null}
        name="feastTime"
      />
      {shownAttribute === "feastTime" && (
        <>
          <Suspense fallback={`Loading...`}>
            <DynamicStopwatch
              setStoppedTime={setStoppedTime}
              stoppedTime={stoppedTime}
            />
          </Suspense>
        </>
      )}
      <CheckButton aria-label="save data">SAVE</CheckButton>
    </FormElement>
  );
}

const FormElement = styled.form`
  background: var(--background-secondary-blur);
  border: 1px solid var(--text-secondary);
  color: var(--text-secondary);
  border-radius: 2em;
  box-shadow: var(--shadow-elevation);
  backdrop-filter: blur(10px);
  height: 50%;
  width: 100%;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 0.5em;
  margin: 2em 1em 6em 1em;
  padding-top: 1em;

  input {
    width: 8em;
    max-height: 2em;
    border-radius: 0.5em;
    font-size: var(--form-fontSize);
    font-family: "Noto Sans";
    color: var(--not-black);
    margin: 0.5em 0.5em;
    padding: 0 0.2em;

    ::placeholder {
      text-align: center;
    }
  }

  p {
    max-height: 2em;
    position: relative;
    margin: 0 10% 0 0;
    font-size: var(--form-fontSize);
  }
`;

const CheckButton = styled(Button)`
  position: absolute;
  bottom: -3em;
  font-size: 2em;
  background-color: var(--background-primary);
  padding: 0.2em 1em;
  border-radius: 1em;
  border: 0.1em var(--text-secondary) solid;
  box-shadow: var(--shadow-elevation);
`;
