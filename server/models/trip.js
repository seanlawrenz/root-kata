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
