import dbConnect from '../lib/dbConnect';
import User from '../models/User';

export async function getUserSettings(userEmail) {
  await dbConnect();

  const userSettings = await User.findOne({ email: userEmail });

  if (userSettings) {
    const sanitizedUserSettings = {
      firstName: userSettings.firstName,
      lastName: userSettings.lastName,
      babyName: userSettings.babyName,
      babyBirthday: userSettings.babyBirthday,
      email: userSettings.email,
      _id: userSettings.id,
    };
    return sanitizedUserSettings;
  }

  return null;
}
