import styled from 'styled-components';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

//----- import dynamic component to not get hydration error -----
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Button } from '../Button';
const DynamicStopwatch = dynamic(() => import('./Stopwatch'), {
  ssr: false,
});

export default function Form({ onSubmit, setShownAttribute, shownAttribute }) {
  const [stoppedTime, setStoppedTime] = useState();
  const [selectedFoodSource, setSelectedFoodSource] = useState();
  const { data: session } = useSession();

  function sendForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const timeStamp = new Date().getTime();
    const { weight, date, height, feastTime, foodSource, diaperColor } = Object.fromEntries(formData);

    const userEmail = session.user.email;
    const weightInput = typeof weight !== 'undefined' ? weight : '';
    const heightInput = typeof height !== 'undefined' ? height : '';
    const timeInput = typeof feastTime !== 'undefined' ? feastTime : '';
    const foodSourceInput = typeof foodSource !== 'undefined' ? foodSource : '';
    const diaperColorInput = typeof diaperColor !== 'undefined' ? diaperColor : '';

    if (shownAttribute === 'weight' && weightInput == '') {
      alert('How much does the baby weight?');
      return false;
    } else if (shownAttribute === 'height' && heightInput == '') {
      alert('What is the babys height.');
      return false;
    } else if (shownAttribute === 'feastTime' && timeInput == '') {
      alert('How long did you feed the baby?');
      return false;
    } else if (shownAttribute === 'feastTime' && foodSourceInput == '') {
      alert('On which side did you feed the baby, or did you use a bottle?');
      return false;
    } else if (shownAttribute === 'diaper' && diaperColorInput == '') {
      alert('With which diaper substance color have you been surprised with?');
      return false;
    }

    // -- check formData key-value pairs
    formData.forEach((value, key) => {
      console.log(key + value);
    });

    onSubmit({ weight, date, height, feastTime, foodSource, diaperColor, timeStamp, userEmail });
    setShownAttribute('');
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
      {shownAttribute === 'weight' && (
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
      {shownAttribute === 'height' && (
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
      {shownAttribute === 'diaper' && <input aria-label="diaper color input" type="color" name="diaperColor" />}
      {shownAttribute === 'feastTime' && (
        <>
          <input type="hidden" value={stoppedTime} defaultValue={null} name="feastTime" />

          <RadioButtonSection>
            <input
              type="radio"
              name="foodSource"
              value="left"
              id="foodSource-left"
              onClick={(event) => setSelectedFoodSource(event.target.value)}
              required
            />
            <StyledLabel htmlFor="foodSource-left" checked={selectedFoodSource === 'left' ? 1 : 0}>
              left
            </StyledLabel>

            <input
              type="radio"
              name="foodSource"
              value="right"
              id="foodSource-right"
              onClick={(event) => setSelectedFoodSource(event.target.value)}
            />
            <StyledLabel htmlFor="foodSource-right" checked={selectedFoodSource === 'right' ? 1 : 0}>
              right
            </StyledLabel>
            <input
              type="radio"
              name="foodSource"
              value="bottle"
              id="foodSource-bottle"
              onClick={(event) => setSelectedFoodSource(event.target.value)}
            />
            <StyledLabel htmlFor="foodSource-bottle" checked={selectedFoodSource === 'bottle' ? 1 : 0}>
              bottle
            </StyledLabel>
          </RadioButtonSection>
          <Suspense fallback={`Loading...`}>
            <DynamicStopwatch setStoppedTime={setStoppedTime} stoppedTime={stoppedTime} />
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
    font-family: 'Noto Sans';
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

const RadioButtonSection = styled.div`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  margin: 1em;

  // make radio button disappear
  input {
    position: absolute;
    opacity: 0;
    width: 0;
  }
`;

const StyledLabel = styled.label`
  cursor: pointer;
  border-radius: 1em;
  border-width: 1px;
  border-style: solid;
  box-shadow: var(--shadow-elevation);
  padding: 0.5em 1em;
  margin: 0.5em;
  text-decoration: ${({ checked }) => (checked ? 'underline' : 'none')};
  background-color: ${({ checked }) => (checked ? 'pink' : 'normal')};
  font-weight: ${({ checked }) => (checked ? 'bold' : 'normal')};
`;
