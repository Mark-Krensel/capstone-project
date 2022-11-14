import { useSession, signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { CardContainer } from "../components/CardContainer";
import lottie from "lottie-web";
import Card from "../components/Card";
import { SignInButton } from "../components/SignInButton";
import { getAllDays } from "../services/dayService";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Dashboard from "../components/Dashboard";

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    const days = await getAllDays(session.user.email);
    return {
      props: { days: JSON.parse(JSON.stringify(days)) },
    };
  } else
    return {
      props: {},
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
    const latestWeight = days.find((element) => element.weights.length !== 0)
      ?.weights[0];
    const latestHeight = days.find((element) => element.heights.length !== 0)
      ?.heights[0];
    const latestFeastTime = days.find((element) => element.feastTimes !== 0)
      ?.feastTimes[0];

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
        <Dashboard
          weight={latestWeight}
          height={latestHeight}
          feastTime={latestFeastTime}
        />

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
        <StyledText>You are not signed in</StyledText>
        <SignInButton onClick={() => signIn("github")}>Sign in</SignInButton>
        <LottieContainer ref={container} />
      </CardContainer>
    </>
  );
}

const LottieContainer = styled.div`
  width: 100%;
  max-width: 35em;
  margin: 1em 5em;
`;
const EmptyHeading = styled.h2`
  width: 100%;
  text-align: center;
`;

const StyledText = styled.h2`
  width: 100%;
  text-align: center;
  margin-top: 2em;
`;
