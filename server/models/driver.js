import mongoose, { Schema } from 'mongoose';

const DriverSchema = new Schema({
  name: String,
});

export default mongoose.model('Driver', DriverSchema);
