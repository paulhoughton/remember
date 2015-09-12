var round = (n,dp=1)=>Math.round(n*Math.pow(10,dp))/Math.pow(10,dp);

var radians = (deg)=>deg * (Math.PI/180);

var degrees = (rad)=>rad * (180/Math.PI);

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	const R = 6371; // Radius of the earth in km
	let dLat = radians(lat2-lat1); 
	let dLon = radians(lon2-lon1); 
	let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	return R * c;
}

function getDegrees(startLat,startLong,endLat,endLong){
	let radStartLat = radians(startLat);
	let radStartLong = radians(startLong);
	let radEndLat = radians(endLat);
	let radEndLong = radians(endLong);

	let dLong = radEndLong - radStartLong;

	let dPhi = Math.log(Math.tan(radEndLat/2.0+Math.PI/4.0)/Math.tan(radStartLat/2.0+Math.PI/4.0));
	if (Math.abs(dLong) > Math.PI){
		dLong = (dLong > 0.0)?
			dLong = -(2.0 * Math.PI - dLong):
			dLong = (2.0 * Math.PI + dLong);
	}

	return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
}

export default {degrees,
	radians,
	round,
	getDegrees,
	getDistanceFromLatLonInKm
} 