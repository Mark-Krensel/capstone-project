import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [startTime, setStartTime] = useState();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (startTime) {
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

      return () => clearInterval(interval);
    }
  }, [startTime]);

  return (
    <>
      {startTime && (
        <>
          <div>
            {hours}:{minutes}:{seconds}
          </div>
          <button
            type="button"
            aria-label="stop stopwatch"
            onClick={() => {
              setStartTime("");
              localStorage.removeItem("startTime");
            }}
          >
            Stop
          </button>
        </>
      )}
      {!startTime && (
        <button
          type="button"
          aria-label="start stopwatch"
          onClick={() => {
            setStartTime(new Date().getTime());
          }}
        >
          Start
        </button>
      )}
    </>
  );
}
