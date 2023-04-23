import dbConnect from '../../../lib/dbConnect';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import Day from '../../../models/Day';
import { getAllDays, checkAndGetDate, getDayById } from '../../../services/dayService';

export default async function handler(request, response) {
  const session = await unstable_getServerSession(request, response, authOptions);
  await dbConnect();
  const id = request.query.id;
  const dataPointId = request.query.dataPointId;
  const attribute = request.query.attribute;

  switch (request.method) {
    case 'GET':
      const days = await getAllDays();
      return response.status(200).json(days);

    case 'POST':
      const postData = JSON.parse(request.body);
      const dateToBeChecked = postData.date;
      const existingDay = await checkAndGetDate(dateToBeChecked, postData.userEmail);

      if (existingDay) {
        const updatedWeight = postData.weight
          ? [{ value: postData.weight, timeStamp: postData.timeStamp }, ...existingDay.weights]
          : [...existingDay.weights];
        const updatedHeight = postData.height
          ? [{ value: postData.height, timeStamp: postData.timeStamp }, ...existingDay.heights]
          : [...existingDay.heights];
        const updatedDiaperColor = postData.diaperColor
          ? [{ value: postData.diaperColor, timeStamp: postData.timeStamp }, ...existingDay.diaperColors]
          : [...existingDay.diaperColors];
        const updatedFeastTime = postData.feastTime
          ? [
              { value: postData.feastTime, timeStamp: postData.timeStamp, source: postData.foodSource },
              ...existingDay.feastTimes,
            ]
          : [...existingDay.feastTimes];

        const updatedDay = {
          ...existingDay,
          weights: updatedWeight,
          heights: updatedHeight,
          diaperColors: updatedDiaperColor,
          feastTimes: updatedFeastTime,
        };

        const updatedDayInDb = await Day.findByIdAndUpdate(existingDay.id, updatedDay);

        return response.status(201).json({ message: 'Data saved', updatedId: updatedDayInDb.id });
      } else {
        const newPostData = {
          date: postData.date,
          userEmail: postData.userEmail,
          weights: postData.weight ? [{ value: postData.weight, timeStamp: postData.timeStamp }] : [],
          heights: postData.height ? [{ value: postData.height, timeStamp: postData.timeStamp }] : [],
          diaperColors: postData.diaperColor ? [{ value: postData.diaperColor, timeStamp: postData.timeStamp }] : [],
          feastTimes: postData.feastTime
            ? [{ value: postData.feastTime, timeStamp: postData.timeStamp, source: postData.foodSource }]
            : [],
        };

        const newDay = await Day.create(newPostData);

        return response.status(201).json({ message: 'Data saved', createdId: newDay.id });
      }

    case 'DELETE':
      if (!dataPointId) {
        await Day.findByIdAndDelete(id);
        return response.status(200).json({ message: 'Entry deleted', deletedId: id });
      } else {
        await Day.updateMany({ $pull: { [attribute]: { _id: dataPointId } } });
        const day = await getDayById(id, session.user.email);
        if (
          day.heights.length === 0 &&
          day.weights.length === 0 &&
          day.diaperColors.length === 0 &&
          day.feastTimes.length === 0
        ) {
          await Day.findByIdAndDelete(id);
          return response.status(200).json({ message: 'Entry deleted', deletedId: id });
        }
        return response.status(200).json({ message: 'Entry deleted', deletedId: dataPointId });
      }

    default:
      return response.status(405).json({ message: 'HTTP method is not allowed' });
  }
}
