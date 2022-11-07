import dbConnect from "../../../lib/dbConnect";
import Day from "../../../models/Day";
import { getAllDays, checkAndGetDate } from "../../../services/dayService";

export default async function handler(request, response) {
  await dbConnect();
  const id = request.query.id;

  switch (request.method) {
    case "GET":
      const days = await getAllDays();
      return response.status(200).json(days);

    case "POST":
      const postData = JSON.parse(request.body);
      const dateToBeChecked = postData.date;
      const existingDay = await checkAndGetDate(dateToBeChecked);

      if (existingDay) {
        const updatedWeight = postData.weight
          ? [...existingDay.weights, postData.weight]
          : [...existingDay.weights];
        const updatedHeight = postData.height
          ? [...existingDay.heights, postData.height]
          : [...existingDay.heights];
        const updatedFeastTime = postData.feastTime
          ? [...existingDay.feastTimes, postData.feastTime]
          : [...existingDay.feastTimes];

        const updatedDay = {
          ...existingDay,
          weights: updatedWeight,
          heights: updatedHeight,
          feastTimes: updatedFeastTime,
        };

        const updatedDayInDb = await Day.findByIdAndUpdate(
          existingDay.id,
          updatedDay
        );

        return response
          .status(201)
          .json({ message: "Data saved", updatedId: updatedDayInDb.id });
      } else {
        postData.weights = postData.weight ? [postData.weight] : [];
        postData.heights = postData.height ? [postData.height] : [];
        postData.feastTimes = postData.feastTime ? [postData.feastTime] : [];

        const newDay = await Day.create(postData);

        return response
          .status(201)
          .json({ message: "Data saved", createdId: newDay.id });
      }

    case "DELETE":
      await Day.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ message: "Entry deleted", deletedId: id });

    default:
      return response
        .status(405)
        .json({ message: "HTTP method is not allowed" });
  }
}
