import { build, fake } from 'test-data-bot';

export const driverBuilder = build('driver').fields({
  name: fake(f => f.name.firstName()),
  _id: fake(f => f.random.uuid()),
});

export const mockDriver = driverBuilder();
