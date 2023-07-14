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

import { CanvasContainer } from '../components/CanvasContainer';
// import LineChart from '../components/charts/LineChart';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    const days = await getAllDays(session.user.email);
    return {
      props: { days: JSON.parse(JSON.stringify(days)) },
    };
  } else return { props: {} };
}

export default function WeightPage({ days }) {
  const { data: session } = useSession();

  const [chartData, setChartData] = useState({});

  const ChartComponent = dynamic(() => import('../components/charts/ChartComponent'), { ssr: false });

  useEffect(() => {
    async function fetchData() {
      //TODO maybe covert data inside jason and just replace first 3 months manually
      const response = await fetch('/tables/girls0To5Years.json');
      const response2 = await fetch('/tables/girls0To13Weeks.json');
      const dataMonths = await response.json();
      const dataWeeks = await response2.json();
      const convertedWeekData = dataWeeks.map((item) => ({ ...item, Month: item.Week / 4 }));
      const combinedData = convertedWeekData.concat(dataMonths.slice(3));
      console.log(combinedData);

      const labels = combinedData.map((item) => item.Month);

      // const datasets = Object.keys(dataMonths[0])
      //   .filter((key) => key !== 'Month')
      //   .map((key) => {
      //     return {
      //       label: key,
      //       data: dataMonths.map((item) => item[key]),
      //       borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // random color for each line
      //       fill: false,
      //       lineTension: 0.3,
      //     };
      //   });

      const datasets = Object.keys(combinedData[0])
        .filter((key) => key !== 'Month' && key !== 'Week')
        .map((key) => {
          return {
            label: key,
            data: combinedData.map((item) => item[key]),
            borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // random color for each line
            fill: false,
            lineTension: 0.3,
          };
        });

      setChartData({
        labels,
        datasets,
      });
    }
    fetchData();
  }, []);

  if (session) {
    const filteredDays = days.filter((day) => day.weights.length > 0);

    const ascendingFilteredDays = Array.from(filteredDays).reverse();

    // const labels = ascendingFilteredDays.map(
    //   (day) => `${day.date.toString().substr(8, 2)}.${day.date.toString().substr(5, 2)}`
    // );
    // const chartData = ascendingFilteredDays.map((day) => day.weights.map((weight) => weight.value));

    // const meanChartData = chartData.map((array) => array.reduce((a, b) => a + b, 0) / array.length);
    // const title = 'Average Weight';

    // console.log('chartData:', chartData);
    // console.log('meanChartData:', meanChartData);

    return (
      <>
        <CardContainer>
          <CanvasContainer>
            <ChartComponent data={chartData} />
            {/* <LineChart labels={labels} chartData={meanChartData} title={title} /> */}
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
