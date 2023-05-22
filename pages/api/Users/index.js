import dbConnect from '../../../lib/dbConnect';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import User from '../../../models/User';

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  switch (request.method) {
    case 'POST': {
      console.log('hello');
      // Create a user
      const postData = JSON.parse(request.body);
      //   const { firstName, lastName, email, babyName, babyBirthday } = JSON.parse(request.body);

      try {
        const newPostData = {
          firstName: postData.firstName,
          lastName: postData.lastName,
          email: postData.email,
          babyName: postData.babyName,
          babyBirthday: postData.babyBirthday,
        };

        // await user.save();
        const newUser = await User.create(newPostData);
        response.status(201).json({ success: true, newUser });
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;
    }

    case 'DELETE': {
      // Delete a user
      const { id } = request.body;

      try {
        await User.findByIdAndDelete(id);
        response.status(200).json({ success: true });
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;
    }

    case 'PUT': {
      // Update a user
      const { id, firstName, lastName, email, babyName, babyBirthday } = request.body;

      try {
        const user = await User.findByIdAndUpdate(
          id,
          { firstName, lastName, email, babyName, babyBirthday },
          { new: true }
        );
        response.status(200).json({ success: true, user });
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;
    }

    default:
      response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
