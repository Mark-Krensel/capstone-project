import dbConnect from '../lib/dbConnect';
import User from '../models/User';

export async function getUserSettings(userEmail) {
  await dbConnect();

  const userSettings = await User.find({ email: userEmail });

  const sanitizedUserSettings = userSettings.map((setting) => ({
    firstName: setting.firstName,
    lastName: setting.lastName,
    babyName: setting.babyName,
    babyBirthday: setting.babyBirthday,
    email: setting.email,
  }));

  return sanitizedUserSettings;
}
