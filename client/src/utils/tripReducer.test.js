import { tripReducer, formatTime, averageSpeedCalc } from './tripReducer';
import { mockTrip, tripBuilder } from '../testing';

describe('formatTime', () => {
  let test;
  it('should return hours minutes and seconds', () => {
    test = formatTime(298999);
    expect(test).toBe('4:58');
  });
});

describe('averageSpeedCalc', () => {
  let test;
  it('should return 5 mph for 10 hours at 50 miles', () => {
    test = averageSpeedCalc(50, 3.6e7);
    expect(test).toEqual(5);
  });
});

describe('TripReducer', () => {
  let test;
  it('should handle bad data', () => {
    test = tripReducer(undefined);
    expect(test).toEqual([]);
  });

  it('should handle no trips', () => {
    test = tripReducer([]);
    expect(test).toEqual([]);
  });

  it('should aggregate all trips and return total miles', () => {
    const mockTrip2 = tripBuilder();
    const totalMiles = mockTrip.miles + mockTrip2.miles;
    test = tripReducer([mockTrip, mockTrip2]);
    expect(test.totalMiles).toEqual(totalMiles);
  });
});
