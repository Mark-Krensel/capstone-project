import mongoose from "mongoose";

const { Schema } = mongoose;
const weightSchema = new Schema({ type: Number });
const heightSchema = new Schema({ type: Number });
const feasttime = new Schema({ type: Number });

const daySchema = new Schema(
  {
    date: { type: String, required: true },
    weight: [weightSchema],
    height: [heightSchema],
    feastTime: [feasttime],
  },
  { versionKey: false }
);

const Day = mongoose.models.Day || mongoose.model("Day", daySchema);

export default Day;
