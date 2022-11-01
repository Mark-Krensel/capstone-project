import dbConnect from "../lib/dbConnect";
import Day from "../models/Day";

export async function getAllDays() {
  await dbConnect();

  const days = await Day.find();

  const sortedDays = days.sort((a, b) => (a.date < b.date ? 1 : -1));

  const sanitizedDays = sortedDays.map((day) => ({
    id: day.id,
    date: day.date,
    weight: day.weight,
    height: day.height,
    feastTime: day.feastTime,
  }));

  return sanitizedDays;
}

export async function getDayById(id) {
  await dbConnect();

  const day = await Day.findById(id);

  const sanitizedDay = {
    id: day.id,
    date: day.date,
    weight: day.weight,
    height: day.height,
    feastTime: day.feastTime,
  };

  return sanitizedDay;
}
