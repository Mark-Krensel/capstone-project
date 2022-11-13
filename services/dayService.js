import dbConnect from "../lib/dbConnect";
import Day from "../models/Day";

export async function getAllDays(userEmail) {
  await dbConnect();

  const days = await Day.find({ userEmail: userEmail });

  const sortedDays = days.sort((a, b) => (a.date < b.date ? 1 : -1));

  const sanitizedDays = sortedDays.map((day) => ({
    id: day.id,
    date: day.date,
    weights: day.weights,
    heights: day.heights,
    feastTimes: day.feastTimes,
  }));

  return sanitizedDays;
}

export async function getDayById(id, userEmail) {
  await dbConnect();

  // const day = await Day.findById(id);
  const day = await Day.findOne({ _id: id, userEmail: userEmail });

  const sanitizedDay = {
    id: day.id,
    date: day.date,
    weights: day.weights,
    heights: day.heights,
    feastTimes: day.feastTimes,
  };

  return sanitizedDay;
}

export async function checkAndGetDate(dateToBeChecked, userEmail) {
  await dbConnect();

  const day = await Day.findOne({
    date: dateToBeChecked,
    userEmail: userEmail,
  });
  if (day) {
    const sanitizedDay = {
      id: day.id,
      date: day.date,
      weights: day.weights,
      heights: day.heights,
      feastTimes: day.feastTimes,
    };
    return sanitizedDay;
  }
}
