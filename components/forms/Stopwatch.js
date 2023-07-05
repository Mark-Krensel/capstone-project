import { useEffect, useState } from 'react';
import { Button } from '../Button';
import styled from 'styled-components';
import Play from '../icons/XPlay';
import Stop from '../icons/XStop';

export default function Stopwatch({ setStoppedTime, stoppedTime }) {
  const storedStartTime = typeof window !== 'undefined' ? localStorage.getItem('startTime') : null;
  const [startTime, setStartTime] = useState(storedStartTime ?? '');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (stoppedTime) {
      setInputValue(`${stoppedTime.substr(2, 2)}:${stoppedTime.substr(4, 2)}`);
    } else {
      setInputValue('00:00');
    }
  }, [stoppedTime]);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = now.getTime() - startTime;

        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setHours(h);

        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setMinutes(m);

        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setSeconds(s);
        localStorage.setItem('startTime', startTime);
      }, 1000);

      return () => {
        clearInterval(interval);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      };
    }
  }, [startTime]);

  const formatInputValue = (input) => {
    const rawValue = input.replace(/[^0-9]/g, ''); // remove non-digits
    let m, s;
    if (rawValue.length >= 4) {
      m = rawValue.slice(-4, -2);
      s = rawValue.slice(-2);
    } else if (rawValue.length >= 2) {
      m = '00';
      s = rawValue.slice(-2);
    } else {
      m = '00';
      s = '0' + rawValue;
    }

    // Limit minutes and seconds to 59
    m = Math.min(m, 59);
    s = Math.min(s, 59);

    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <>
      <TimeWrapper
        onClick={() => {
          if (!editing && !startTime) setEditing(true);
        }}
      >
        {editing ? (
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(formatInputValue(e.target.value));
            }}
            onBlur={() => {
              setEditing(false);
              const [m, s] = inputValue.split(':').map(Number);
              const h = Math.floor(m / 60);
              const remMins = m % 60;
              setStoppedTime(
                `${String(h).padStart(2, '0')}${String(remMins).padStart(2, '0')}${String(s).padStart(2, '0')}`
              );
            }}
          />
        ) : startTime ? (
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        ) : stoppedTime ? (
          `${stoppedTime.substr(2, 2)}:${stoppedTime.substr(4, 2)}`
        ) : (
          '00:00'
        )}
      </TimeWrapper>
      {startTime ? (
        <ButtonWrapper>
          <Button
            type="button"
            aria-label="stop stopwatch"
            onClick={() => {
              setStoppedTime(
                `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}${String(seconds).padStart(
                  2,
                  '0'
                )}`
              );
              setStartTime('');
              localStorage.removeItem('startTime');
            }}
          >
            <Stop fontSize="6rem" alt="stop" />
          </Button>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <Button
            type="button"
            aria-label="start stopwatch"
            onClick={() => {
              setStartTime(new Date().getTime());
            }}
          >
            <Play fontSize="6rem" alt="start" />
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
}

const ButtonWrapper = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 6em;
  margin: 1em 0;
`;

const TimeWrapper = styled.div`
  font-size: 4em;
  cursor: pointer;
`;
