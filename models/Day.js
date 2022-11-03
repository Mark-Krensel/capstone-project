import mongoose from "mongoose";

const { Schema } = mongoose;
// const weightSchema = new Schema({ type: Number });
// const heightSchema = new Schema({ type: Number });
// const feastTimeSchema = new Schema({ type: String });

const daySchema = new Schema(
  {
    date: { type: String, required: true },
    weight: [Number],
    height: [Number],
    feastTime: [String],
  },
  { versionKey: false }
);

const Day = mongoose.models.Day || mongoose.model("Day", daySchema);

export default Day;
