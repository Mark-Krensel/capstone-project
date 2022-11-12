import { useSession, signIn, signOut } from "next-auth/react";
import { CardContainer } from "../components/CardContainer";
import lottie from "lottie-web";
import Card from "../components/Card";
import { getAllDays } from "../services/dayService";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

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

  //----- LottieFile -----
  const container = useRef(null);
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      animationData: require("../public/MomBaby.json"),
    });
    return () => instance.destroy();
  }, []);

  //----- Session -----
  const { data: session } = useSession();
  if (session) {
    return (
      <CardContainer>
        {days.length === 0 && (
          <>
            <EmptyHeading>
              {"You don't have any data saved right now"}
            </EmptyHeading>
            <LottieContainer ref={container} />
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
  return (
    <>
      <CardContainer>
        <p>Not signed in</p>
        <button onClick={() => signIn()}>Sign in</button>
      </CardContainer>
    </>
  );
}

const LottieContainer = styled.div`
  width: 100%;
  max-width: 35em;
  margin: 5em;
`;
const EmptyHeading = styled.h2`
  width: 100%;
  text-align: center;
`;
