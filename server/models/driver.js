import mongoose, { Schema } from 'mongoose';

const DriverSchema = new Schema({
  name: String,
  trips: [{ type: Schema.Types.ObjectId, ref: 'Trip' }],
});

export default mongoose.model('Driver', DriverSchema);
