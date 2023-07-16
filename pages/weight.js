import { useSession, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

import styled from 'styled-components';
import { CardContainer } from '../components/CardContainer';
import Card from '../components/Card';
import { SignInButton } from '../components/SignInButton';
import { getAllDays } from '../services/dayService';
import { getUserSettings } from '../services/userService';

import { CanvasContainer } from '../components/CanvasContainer';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    const days = await getAllDays(session.user.email);
    const user = await getUserSettings(session.user.email);
    return {
      props: { days: JSON.parse(JSON.stringify(days)), user: JSON.parse(JSON.stringify(user)) },
    };
  } else return { props: {} };
}

export default function WeightPage({ days, user }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const babyBirthday = user.babyBirthday ? user.babyBirthday : null;
  let currentWeek = null;

  const [chartData, setChartData] = useState({});

  const ChartComponent = dynamic(() => import('../components/charts/ChartComponent'), { ssr: false });

  const getWeeksFromBirth = (birthDate, dateString) => {
    if (!birthDate) {
      return null;
    }
    const endDate = new Date(dateString);
    const startDate = new Date(birthDate);

    const timeDiff = endDate.getTime() - startDate.getTime();
    const diffWeeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  };

  if (user && user.babyBirthday) {
    currentWeek = getWeeksFromBirth(babyBirthday, new Date());
  }

  const weightData = days
    .map((item) => {
      const weeks = getWeeksFromBirth(babyBirthday, item.date);
      return item.weights.map((w) => ({ week: weeks, weight: w.value }));
    })
    .flat();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/tables/girlsCombined.json');
      const dataMonths = await response.json();
      const labels = dataMonths.map((item) =>
        item.Week !== undefined ? `${item.Week} weeks` : `${item.Month} months`
      );
      // create an array filled with nulls that's the same length as labels
      const weightDataArray = new Array(labels.length).fill(null);
      // populate the array with your weight data at the appropriate indices
      weightData.forEach((w) => {
        weightDataArray[w.week] = w.weight;
      });

      const datasets = Object.keys(dataMonths[0])
        .filter((key) => key !== 'Month' && key !== 'Week')
        .map((key) => {
          return {
            label: key,
            data: dataMonths.map((item) => item[key]),
            borderColor: '#6629cf',
            fill: false,
            lineTension: 0.3,
          };
        });

      datasets.push({
        label: 'Weights',
        data: weightDataArray,
        backgroundColor: '#BF40BF',
        fill: false,
        showLine: false, // this ensures only points are shown
        pointRadius: 8, // adjusts the size of the points
        pointHoverRadius: 10, // adjusts the size of the points when hovered
      });

      setChartData({
        labels,
        datasets,
      });
      setLoading(false); // data is now ready, stop showing loading indicator
    }
    fetchData();
  }, []);

  if (session) {
    const filteredDays = days.filter((day) => day.weights.length > 0);

    return (
      <>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CardContainer>
            <CanvasContainer>
              {babyBirthday && (
                <CanvasContainer>
                  <ChartComponent data={chartData} currentWeek={currentWeek} />
                </CanvasContainer>
              )}
            </CanvasContainer>
            {filteredDays.map((filteredDay) => (
              <Card
                key={filteredDay.id}
                date={filteredDay.date}
                weights={filteredDay.weights}
                heights={[]}
                feastTimes={[]}
                diaperColors={[]}
              />
            ))}
          </CardContainer>
        )}
      </>
    );
  }

  return (
    <>
      {/* <CardContainer>
        <StyledText>You are not signed in</StyledText>
        <SignInButton onClick={() => signIn()}>Sign in</SignInButton>
        <LottieContainer ref={container} />
      </CardContainer> */}
    </>
  );
}

const LottieContainer = styled.div`
  width: 100%;
  max-width: 35em;
  margin: 1em 5em;
`;

const StyledText = styled.h2`
  width: 100%;
  text-align: center;
  margin-top: 2em;
`;
