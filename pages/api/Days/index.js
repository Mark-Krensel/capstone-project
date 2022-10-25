import dbConnect from "../../../lib/dbConnect";
import Day from "../../../models/Day";
import { getAllDays } from "../../../services/dayService";

export default async function handler(request, response) {
  if (request.method === "GET") {
    const days = await getAllDays();
    return response.status(200).json(days);
  } else if (request.method === "POST") {
    await dbConnect();

    const postData = JSON.parse(request.body);
    const newDay = await Day.create(postData);

    return response
      .status(201)
      .json({ message: "Data saved", createdId: newDay.id });
  }

  return response.status(405).json({ message: "HTTP method is not allowed" });
}
