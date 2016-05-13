import { getDistanceFromLatLonInKm } from './geo';

export const calcDistances = (latitude, longitude) => (loc, index) => ({
  ...loc,
  index,
  dist: getDistanceFromLatLonInKm(loc.latitude, loc.longitude, latitude, longitude)
});
