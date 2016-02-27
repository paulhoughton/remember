import test from 'ava';

import * as geo from '../src/helpers/geo';

test('calculate distances', t => {
  const expected = 5569;
  const actual = geo.getDistanceFromLatLonInKm(51.5072, -0.1275, 40.7033, -73.9797);

  t.is(Math.floor(actual), expected, 'should calculate distances in km');
});

test('degrees', t => {
  const actual = geo.getDegrees(51.5072, -0.1275, 51.51385, -0.09835);

  t.is(Math.floor(actual), 69, 'should calculate degrees');

  const actual1 = geo.getDegrees(51.49948, -0.12481, 51.50136, -0.14189);

  t.is(Math.floor(actual1), 280, 'should calculate degrees');
});
