import mongoose from "mongoose";
import nanoid from "nanoid";

// let id = mongoose.Types.ObjectId();
const { Schema } = mongoose;
// const weightSchema = new Schema({ type: Number });
// const heightSchema = new Schema({ type: Number });
// const feastTimeSchema = new Schema({ type: String });

// [{ timeStamp: { type: String }, value: { type: Number }, id: nanoid() }];

const daySchema = new Schema(
  {
    date: { type: String, required: true },
    weights: [
      {
        timeStamp: { type: String },
        value: { type: Number },
        id: { type: mongoose.Types.ObjectId },
      },
    ],
    heights: [
      {
        timeStamp: { type: String },
        value: { type: Number },
        id: { type: mongoose.Types.ObjectId },
      },
    ],
    feastTimes: [
      {
        timeStamp: { type: String },
        value: { type: String },
        id: { type: mongoose.Types.ObjectId },
      },
    ],
  },
  { versionKey: false }
);

const Day = mongoose.models.Day || mongoose.model("Day", daySchema);

export default Day;
