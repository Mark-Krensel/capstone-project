import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    babyName: {
      type: String,
      required: true,
    },
    babyBirthday: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
