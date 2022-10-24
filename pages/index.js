import Head from "next/head";
import Card from "../components/Card";
import styled from "styled-components";
import Form from "../components/forms/Form";
import { useState } from "react";

const fakeDB = [
  { id: "jkl345", weight: 34, height: 3, date: "12/01/2022" },
  { id: "jkr35t5", weight: 6, height: 37, date: "21/08/2022" },
  { id: "oin345n", weight: 3.56, height: 54, date: "18/10/2022" },
];

export default function Home() {
  const [cardData, setCardData] = useState(fakeDB);

  function appendCard(weight, date, height) {
    setCardData((cardData) => [
      ...cardData,
      {
        date,
        weight,
        height,
        id: Math.random().toString(36).substring(2),
      },
    ]);
  }

  return (
    <div>
      <Head>
        <title>My Baby</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CardContainer>
          {cardData.map((card) => (
            <Card
              key={card.id}
              weight={card.weight}
              date={card.date}
              height={card.height}
            />
          ))}
        </CardContainer>
        <Form onAddData={appendCard} />
      </main>
    </div>
  );
}

const CardContainer = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em;
  margin-top: 3.5em;
`;
