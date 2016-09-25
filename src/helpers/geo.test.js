import * as geo from './geo';

test('calculate distances', () => {
  const expected = 5569;
  const actual = geo.getDistanceFromLatLonInKm(51.5072, -0.1275, 40.7033, -73.9797);

  expect(actual).toBeCloseTo(expected, 0);
});

test('should calculate degrees', () => {
  const actual = geo.getDegrees(51.5072, -0.1275, 51.51385, -0.09835);

  expect(actual).toBeCloseTo(70, 0);

  const actual1 = geo.getDegrees(51.49948, -0.12481, 51.50136, -0.14189);

  expect(actual1).toBeCloseTo(280, 0);
});
