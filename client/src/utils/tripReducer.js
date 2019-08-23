export const formatTime = millis => {
  const time = new Date(millis);
  return `${time.getUTCHours() === 0 ? '' : `${time.getUTCHours()}:`}${time.getUTCMinutes()}:${time.getSeconds()}`;
};

export const averageSpeedCalc = (miles, millis) => {
  const hours = parseInt((millis / (1000 * 60 * 60)) % 24);
  if (hours > 0) {
    return miles / hours;
  } else {
    return 0;
  }
};

export const tripReducer = tripInfo => {
  if (!tripInfo || tripInfo.length === 0) {
    return [];
  }

  let totalTime = 0;
  let totalMiles = 0;

  tripInfo.forEach(trip => {
    const { startTime, endTime, miles } = trip;
    totalTime = totalTime + Math.abs(new Date(endTime) - new Date(startTime));
    totalMiles = totalMiles + miles;
  });
  const averageSpeed = averageSpeedCalc(totalMiles, totalTime);

  return {
    averageSpeed,
    totalMiles,
  };
};
