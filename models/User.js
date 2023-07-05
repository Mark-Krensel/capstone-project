import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    babyName: {
      type: String,
    },
    babyBirthday: {
      type: Date,
    },
  },
  { versionKey: false }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
