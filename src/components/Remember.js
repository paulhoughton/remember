import React, { Component } from "react";
import App from './App.js';
import {round} from '../helpers.js';

export default class Remember extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:JSON.parse(localStorage.getItem('remember.locations')) || [],
			geo:{}
		};
		this.initGeoWatch();
		this.initOrientationWatch();
	}

	render() {
		return   <App
			      	addLocation = {::this.addLocation}
			      	data = {this.state.data}
			      	deleteLocation = {::this.deleteLocation}
			      	geo = {this.state.geo}
					updateDescription = {::this.updateDescription}/> ;
	}

	componentDidUpdate(newProps, newState){
		if (newState.data!==this.state.data) {
			localStorage.setItem('remember.locations', JSON.stringify(this.state.data));
		}
	}

	initGeoWatch() {
		navigator.geolocation.watchPosition((pos)=> {
			let {geo} = this.state;
			geo.lastUpdate = pos.timestamp,
			geo.lat = pos.coords.latitude,
			geo.lon = pos.coords.longitude,
			geo.accuracy = pos.coords.accuracy
			this.setState({geo})
		}, (error)=> {
			alert(error.message);
		}, {enableHighAccuracy: false});
	}

	initOrientationWatch() {
		if (window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', (e)=> {
				if (e.alpha != null) {
					let {geo} = this.state;
					geo.orientation = Math.floor(e.alpha);
					this.setState({geo})
				}
			}, false);
		} else {
			alert('Orientation unavailable');
		}
	}

	deleteLocation(row) {
		let data=this.state.data.filter((d,i) => i != row);
		this.setState({data})
	}

	addLocation(desc, lat, lon) {
		if (desc !== '') {
			this.setState({data:this.state.data.concat([[
						round(this.state.geo.lat, 4),
						round(this.state.geo.lon, 4),
						desc
					]])
			})
		}
	}

	updateDescription(desc, row) {
		let data=this.state.data.slice();
		data[row][2]=desc;
		this.setState({data})
	}
}

