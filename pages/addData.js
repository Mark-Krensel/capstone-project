import { useRouter } from "next/router";
import FormDB from "../components/forms/FormDB";
import { CardContainer } from "../components/CardContainer";

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
      <h2>Add data</h2>
      <FormDB onSubmit={handleSubmit} />
    </CardContainer>
  );
}
