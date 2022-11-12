import mongoose from "mongoose";
import nanoid from "nanoid";

const { Schema } = mongoose;

const weightSchema = new Schema({
  timeStamp: { type: String },
  value: { type: Number },
  id: { type: mongoose.Types.ObjectId },
});

const heightSchema = new Schema({
  timeStamp: { type: String },
  value: { type: Number },
  id: { type: mongoose.Types.ObjectId },
});

const feastTimeSchema = new Schema({
  timeStamp: { type: String },
  value: { type: String },
  id: { type: mongoose.Types.ObjectId },
});

const daySchema = new Schema(
  {
    date: { type: String, required: true },
    userEmail: { type: String, required: true },
    weights: [weightSchema],
    heights: [heightSchema],
    feastTimes: [feastTimeSchema],
  },
  { versionKey: false }
);

const Day = mongoose.models.Day || mongoose.model("Day", daySchema);

export default Day;
