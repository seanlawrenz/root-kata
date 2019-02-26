import Driver from '../models/driver';
import Trip from '../models/trip';

export const newDriver = (req, res) => {
  const driver = new Driver();
  const { name } = req.body;

  if (!name) {
    return res.json({
      success: false,
      error: 'Missing required information',
    });
  }

  driver.name = name;
  driver.save((error, driver) => {
    if (error) {
      return res.json({ success: false, error });
    }
    return res.json({ success: true, driver });
  });
};

export const getDriver = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findById(id);
    const { _id, name } = driver;
    const trips = await Trip.find({ driver: _id });
    return res.json({
      success: true,
      name,
      trips,
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const getDriveByName = async (req, res) => {
  const { name } = req.body;
  try {
    const driver = await Driver.findOne({ name });
    return res.json({
      success: true,
      id: driver._id,
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

// Mongoose populate is not working for whatever reason.
// This is the correct usage of this and the keys are showing in the db.
// Ref https://github.com/Automattic/mongoose/issues/7562
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
