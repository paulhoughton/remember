const radians = (deg) => deg * (Math.PI / 180);
const degrees = (rad) => rad * (180 / Math.PI);

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const RADIUS = 6371;
  const dLat = radians(lat2 - lat1);
  const dLon = radians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radians(lat1)) * Math.cos(radians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getDegrees(startLat, startLong, endLat, endLong) {
  const radStartLat = radians(startLat);
  const radStartLong = radians(startLong);
  const radEndLat = radians(endLat);
  const radEndLong = radians(endLong);

  let dLong = radEndLong - radStartLong;

  const dPhi = Math.log(Math.tan(radEndLat / 2.0 + Math.PI / 4.0) / Math.tan(radStartLat / 2.0 + Math.PI / 4.0));
  if (Math.abs(dLong) > Math.PI) {
    dLong = (dLong > 0.0) ?
      dLong = -(2.0 * Math.PI - dLong) :
      dLong = (2.0 * Math.PI + dLong);
  }

  return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
}

