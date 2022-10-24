import dbConnect from "../lib/dbConnect";
import Day from "../models/Day";

export async function getAllDays() {
  await dbConnect();

  const days = await Day.find();

  const sanitizedDays = days.map((day) => ({
    id: day.id,
    date: day.name,
    weight: day.weight,
    height: day.height,
  }));

  return sanitizedDays;
}

export async function getDayById(id) {
  await dbConnect();

  const day = await Day.findById(id);

  const sanitizedDay = {
    id: day.id,
    date: day.name,
    weight: day.weight,
    height: day.height,
  };

  return sanitizedDay;
}
