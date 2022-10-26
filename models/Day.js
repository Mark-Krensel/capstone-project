import mongoose from "mongoose";

const { Schema } = mongoose;
const daySchema = new Schema({
  date: { type: String, required: true },
  weight: { type: Number },
  height: { type: Number },
});

const Day = mongoose.models.Day || mongoose.model("Day", daySchema);

export default Day;
