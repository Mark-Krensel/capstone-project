import { useEffect, useState } from "react";

export default function Stopwatch({ setStoppedTime }) {
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
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      };
    }
  }, [startTime]);

  return (
    <>
      {startTime && (
        <>
          <div>
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
          <button
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
