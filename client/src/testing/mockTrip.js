import { build, fake } from 'test-data-bot';

export const tripBuilder = build('trip').fields({
  startTime: fake(f => f.date.recent()),
  endTime: fake(f => f.date.recent()),
  miles: fake(f => f.random.number()),
});

export const mockTrip = tripBuilder();
