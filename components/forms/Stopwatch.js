import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../Button";

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
          <div>
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>

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
            <Image
              src="/images/svgs/stop.svg"
              width={30}
              height={30}
              alt="stop"
            />
          </Button>
        </>
      )}
      {!startTime && (
        <>
          {stoppedTime ? (
            <div>
              {stoppedTime.substr(0, 2)}:{stoppedTime.substr(2, 2)}:
              {stoppedTime.substr(4, 2)}
            </div>
          ) : (
            <div>00:00:00</div>
          )}

          <Button
            type="button"
            aria-label="start stopwatch"
            onClick={() => {
              setStartTime(new Date().getTime());
            }}
          >
            <Image
              src="/images/svgs/play.svg"
              width={30}
              height={30}
              alt="play"
            />
          </Button>
        </>
      )}
    </>
  );
}
