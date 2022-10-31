import { CardContainer } from "../components/CardContainer";
import Card from "../components/Card";
import { getAllDays } from "../services/dayService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const days = await getAllDays();
  return {
    props: { days: days },
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
    <div>
      <main>
        <CardContainer>
          {days.map((day) => (
            <Card
              key={day.id}
              id={day.id}
              weight={day.weight}
              date={day.date}
              height={day.height}
              feastTime={day.feastTime}
              handleDelete={handleDelete}
            />
          ))}
        </CardContainer>
      </main>
    </div>
  );
}
