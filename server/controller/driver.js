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
