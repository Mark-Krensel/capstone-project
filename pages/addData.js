import { useRouter } from "next/router";
import FormDB from "../components/forms/FormDB";
import { getAllDays } from "../services/dayService";
import { CardContainer } from "../components/CardContainer";

export async function getServerSideProps() {
  const days = await getAllDays();

  return {
    props: {
      days,
    },
  };
}

export default function AddData({ days }) {
  const router = useRouter();

  async function handleSubmit(data) {
    try {
      const response = await fetch("/api/Days", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      router.push(`/`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CardContainer>
      <h2>Add data</h2>
      <FormDB onSubmit={handleSubmit} days={days} />
    </CardContainer>
  );
}
