import { CardContainer } from "../components/CardContainer";
import lottie from "lottie-web";
import Card from "../components/Card";
import { getAllDays } from "../services/dayService";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const days = await getAllDays();
  return {
    props: { days: JSON.parse(JSON.stringify(days)) },
  };
}

export default function Home({ days }) {
  //----- update data -----
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
    setIsUpdating(true);
  };
  useEffect(() => {
    setIsUpdating(false);
  }, [days]);

  //----- delete card -----
  async function handleDelete(id, dataPointId, attribute) {
    dataPointId = typeof dataPointId !== "undefined" ? dataPointId : "";
    attribute = typeof attribute !== "undefined" ? attribute : "";
    try {
      const response = await fetch(
        `/api/Days?id=${id}&dataPointId=${dataPointId}&attribute=${attribute}`,
        {
          method: "DELETE",
        }
      );
      await response.json();
      refreshData();
    } catch (error) {
      console.error(error);
    }
  }

  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      animationData: require("../public/loader.json"),
    });
  }, []);

  return (
    <CardContainer>
      {days.length === 0 && (
        <>
          <div ref={container} />
          <h2>{"You don't have any data saved right now"}</h2>
        </>
      )}
      {days.map((day) => (
        <Card
          key={day.id}
          id={day.id}
          date={day.date}
          weights={day.weights}
          heights={day.heights}
          feastTimes={day.feastTimes}
          handleDelete={handleDelete}
        />
      ))}
    </CardContainer>
  );
}
