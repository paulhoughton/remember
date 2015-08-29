import React from 'react';
import '!style!css!./style.css';
import '!style!css!material-design-lite/material.css';
import 'material-design-lite/material';
import App from './components/App.js';
import helpers from './helpers.js';

let data = JSON.parse(localStorage.getItem('remember.locations')) || [];

let currentGeo = {};

navigator.geolocation.watchPosition((pos)=> {
	currentGeo.lastUpdate = pos.timestamp;
	currentGeo.lat = pos.coords.latitude;
	currentGeo.lon = pos.coords.longitude;
	currentGeo.accuracy = pos.coords.accuracy;
	renderApp();
}, (error)=> {
	renderApp();
	alert(error.message);
}, {enableHighAccuracy: false});

if (window.DeviceOrientationEvent) {
	window.addEventListener('deviceorientation', (e)=> {
		if (e.alpha != null) currentGeo.orientation = Math.floor(e.alpha);
		renderApp();
	}, false);
} else {
	alert('Orientation unavailable');
}

function deleteLocation(row) {
	data.splice(row, 1);
	saveItems();
	renderApp();
}

function addLocation(desc, lat, lon) {
	if (desc !== '') {
		data.push([lat || helpers.round(currentGeo.lat, 4),
					lon || helpers.round(currentGeo.lon, 4),
					desc]);
	}

	saveItems();
	renderApp();
}

function renderApp() {
	React.render(
    <App
      addLocation = {addLocation}
      data = {data}
      deleteLocation = {deleteLocation}
      geo = {currentGeo}/>, document.getElementById('container'));
}

function saveItems() {
	localStorage.setItem('remember.locations', JSON.stringify(data));
}
