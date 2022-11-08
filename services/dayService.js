import dbConnect from "../lib/dbConnect";
import Day from "../models/Day";

export async function getAllDays() {
  await dbConnect();

  const days = await Day.find();

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

export async function getDayById(id) {
  await dbConnect();

  const day = await Day.findById(id);

  const sanitizedDay = {
    id: day.id,
    date: day.date,
    weights: day.weights,
    heights: day.heights,
    feastTimes: day.feastTimes,
  };

  return sanitizedDay;
}

export async function checkAndGetDate(dateToBeChecked) {
  await dbConnect();

  const day = await Day.findOne({ date: dateToBeChecked });
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
