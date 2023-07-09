import dbConnect from '../../../lib/dbConnect';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import User from '../../../models/User';

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  switch (request.method) {
    case 'POST': {
      // Create a user
      console.log(' POST request.body:', request.body);
      console.log('POST babyGender: ', request.body.babyGender);
      const postData = request.body; // If request.body is already an object, no need to parse it.

      try {
        const newPostData = {
          firstName: postData.firstName,
          lastName: postData.lastName,
          email: postData.email,
          babyName: postData.babyName,
          babyGender: postData.babyGender,
          babyBirthday: postData.babyBirthday,
        };

        // await user.save();
        const newUser = await User.create(newPostData);
        response.status(201).json({ success: true, newUser });
      } catch (error) {
        response.status(400).json({ success: false, message: error.message });
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
      console.log(' PUT request.body:', request.body);
      const { id, firstName, lastName, email, babyName, babyBirthday, babyGender } = request.body;

      try {
        const user = await User.findByIdAndUpdate(
          { _id: id },
          { firstName, lastName, email, babyName, babyBirthday, babyGender },
          { new: true }
        );
        if (!user) {
          response.status(404).json({ success: false, message: 'User not found' }); // If no user found
        } else {
          response.status(200).json({ success: true, user });
        }
      } catch (error) {
        console.error(error); // log the error
        response.status(400).json({ success: false, error: error.message }); // send back the error message
      }
      //   response.status(200).json({ success: true, user });
      // } catch (error) {
      //   response.status(400).json({ success: false });
      // }
      break;
    }

    default:
      response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
