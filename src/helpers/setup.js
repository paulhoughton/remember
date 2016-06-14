export function geoListeners(callback) {
  let prev = null;

  navigator.geolocation.watchPosition(({ coords, timestamp }) => callback({
    latitude: coords.latitude,
    longitude: coords.longitude,
    lastUpdate: timestamp,
    accuracy: Math.floor(coords.accuracy)
  }),
  (err) => alert('Unable to find position - ' + err.message),
    {
      enableHighAccuracy: true,
      timeout: 15000
    }
  );

  window.addEventListener('deviceorientation', (event) => {
    const alpha = Math.floor(event.alpha);
    if (alpha !== prev) {
      callback({ orientation: Math.floor(alpha) });
      prev = alpha;
    }
  }, true);
}
