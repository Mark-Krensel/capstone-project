import mongoose from "mongoose";

const { Schema } = mongoose;
// const weightSchema = new Schema({ type: Number });
// const heightSchema = new Schema({ type: Number });
// const feastTimeSchema = new Schema({ type: String });

const daySchema = new Schema(
  {
    date: { type: String, required: true },
    weights: [Number],
    heights: [Number],
    feastTimes: [String],
  },
  { versionKey: false }
);

const Day = mongoose.models.Day || mongoose.model("Day", daySchema);

export default Day;
