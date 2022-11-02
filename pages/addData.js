import { useRouter } from "next/router";
import FormDB from "../components/forms/FormDB";
import { CardContainer } from "../components/CardContainer";
import { getDateId } from "../services/dayService";

export default function AddData() {
  const router = useRouter();

  async function handleSubmit(data) {
    const checkDate = data.date;
    const dateId = getDateId(checkDate);

    try {
      if (!dateId) {
        const response = await fetch("/api/Days", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const result = await response.json();

        router.push(`/`);
      } else {
        const response = await fetch("/api/Days", {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        const result = await response.json();
      }
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
