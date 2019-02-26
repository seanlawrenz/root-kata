import mongoose, { Schema } from 'mongoose';

const TripSchema = new Schema({
  startTime: Date,
  endTime: Date,
  miles: Number,
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
  },
});

export default mongoose.model('Trip', TripSchema);

export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find()
      .populate('trips')
      .exec();
    return res.json({ success: true, drivers });
  } catch (error) {
    return res.json({ success: false, error });
  }
};
