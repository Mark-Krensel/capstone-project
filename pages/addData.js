import { useRouter } from "next/router";
import FormDB from "../components/forms/FormDB";
import { CardContainer } from "../components/CardContainer";
// import { getAllDays } from "../services/dayService";
// import { getDateId } from "../services/dayService";

// export async function getServerSideProps() {
//   const dateId = await getDateId();
//   return {
//     props: { dateId: dateId },
//   };
// }

export default function AddData() {
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
      <FormDB onSubmit={handleSubmit} />
    </CardContainer>
  );
}
