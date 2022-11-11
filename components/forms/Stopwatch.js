import { useEffect, useState } from "react";
import { Button } from "../Button";
import styled from "styled-components";
import Play from "../icons/XPlay";
import Stop from "../icons/XStop";

export default function Stopwatch({ setStoppedTime, stoppedTime }) {
  const storedStartTime =
    typeof window !== "undefined" ? localStorage.getItem("startTime") : null;
  const [startTime, setStartTime] = useState(storedStartTime ?? []);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (typeof startTime !== "undefined") {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = now.getTime() - startTime;

        const h = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        setHours(h);

        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setMinutes(m);

        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setSeconds(s);
        localStorage.setItem("startTime", startTime);
      }, 1000);

      return () => {
        clearInterval(interval);
        setHours("");
        setMinutes("");
        setSeconds("");
      };
    }
  }, [startTime]);

  return (
    <>
      {startTime && (
        <>
          <TimeWrapper>
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </TimeWrapper>
          <ButtonWrapper>
            <Button
              type="button"
              aria-label="stop stopwatch"
              onClick={() => {
                setStoppedTime(
                  String(hours).padStart(2, "0") +
                    String(minutes).padStart(2, "0") +
                    String(seconds).padStart(2, "0")
                );
                setStartTime("");
                localStorage.removeItem("startTime");
              }}
            >
              <Stop fontSize="6rem" />
            </Button>
          </ButtonWrapper>
        </>
      )}
      {!startTime && (
        <>
          {stoppedTime ? (
            <TimeWrapper>
              {stoppedTime.substr(0, 2)}:{stoppedTime.substr(2, 2)}:
              {stoppedTime.substr(4, 2)}
            </TimeWrapper>
          ) : (
            <TimeWrapper>00:00:00</TimeWrapper>
          )}
          <ButtonWrapper>
            <Button
              type="button"
              aria-label="start stopwatch"
              onClick={() => {
                setStartTime(new Date().getTime());
              }}
            >
              <Play fontSize="6rem" />
            </Button>
          </ButtonWrapper>
        </>
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
`;
