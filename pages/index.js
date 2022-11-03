import { CardContainer } from "../components/CardContainer";
import Card from "../components/Card";
import { getAllDays } from "../services/dayService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const days = await getAllDays();
  return {
    props: { days: JSON.parse(JSON.stringify(days)) },
  };
}

export default function Home({ days }) {
  // console.log(days.map((day) => day.weight));
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
  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/Days?id=${id}`, {
        method: "DELETE",
      });
      await response.json();
      refreshData();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CardContainer>
      {days.map((day) => (
        <Card
          key={day.id}
          id={day.id}
          date={day.date}
          weight={day.weight}
          height={day.height}
          feastTime={day.feastTime}
          handleDelete={handleDelete}
        />
      ))}
    </CardContainer>
  );
}
