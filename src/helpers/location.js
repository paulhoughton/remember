import { getDistanceFromLatLonInKm } from './geo';

export const calcDistances = (latitude, longitude) => (loc, i) => {
  return {
    ...loc,
    index: i,
    dist: getDistanceFromLatLonInKm(loc.latitude, loc.longitude, latitude, longitude)
  };
};
