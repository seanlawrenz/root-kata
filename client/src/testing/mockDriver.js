import { build, fake } from 'test-data-bot';

export const driverBuilder = build('driver').fields({
  name: fake(f => f.name.firstName()),
});

export const mockDriver = driverBuilder();
