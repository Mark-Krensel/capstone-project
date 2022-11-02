import dbConnect from "../../../lib/dbConnect";
import Day from "../../../models/Day";
import { getAllDays } from "../../../services/dayService";

export default async function handler(request, response) {
  await dbConnect();
  const id = request.query.id;

  switch (request.method) {
    case "GET":
      const days = await getAllDays();
      return response.status(200).json(days);

    case "POST":
      const postData = JSON.parse(request.body);
      const newDay = await Day.create(postData);

      return response
        .status(201)
        .json({ message: "Data saved", createdId: newDay.id });

    case "DELETE":
      await Day.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ message: "Entry deleted", deletedId: id });

      //     case"PATCH":
      //     await
      // default:
      return response
        .status(405)
        .json({ message: "HTTP method is not allowed" });
  }
}
