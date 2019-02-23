import Trip from '../models/trip';
import Driver from '../models/driver';

export const newTrip = (req, res) => {
  const trip = new Trip();
  const { startTime, endTime, miles, driver } = req.body;

  if (!startTime || !endTime || !miles || !driver) {
    return res.json({
      success: false,
      error: 'Missing required information',
    });
  }

  trip.startTime = startTime;
  trip.endTime = endTime;
  trip.miles = miles;
  trip.driver = driver;

  trip.save(error => {
    if (error) {
      return res.json({ success: false, error });
    }
    return res.json({ success: true });
  });
};
