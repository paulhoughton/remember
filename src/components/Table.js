import React, { Component, PropTypes } from "react";
import TableRow from "./TableRow";
import {getDistanceFromLatLonInKm} from "../helpers";

export default class Table extends Component {

	static propTypes = {
		addLocation: PropTypes.func.isRequired,
		data: PropTypes.array,
		deleteLocation: PropTypes.func.isRequired,
		detailed: PropTypes.bool,
		geo: PropTypes.object,
		newLocation: PropTypes.bool,
		showNewItem: PropTypes.func
	};

	render() {
		let distByRow=[];

		let rows;
		if (this.props.geo.lat){
			rows=this.props.data.map(([lat, lon, desc], i) => {

				let dist=getDistanceFromLatLonInKm(lat, lon, this.props.geo.lat, this.props.geo.lon);

				distByRow.push(dist);

				return (<TableRow
					{...this.props}
					confirm={this.props.addLocation}
					deleteRow={this.props.deleteLocation.bind(this, i)}
					desc={desc}
					dist={dist}
					key={i}
					lat={lat}
					lon={lon}
					row={i}/>);
			});

			rows.sort((a,b)=>distByRow[a.key]>distByRow[b.key]);

			if (this.props.newLocation)
			{
				rows.unshift(<TableRow
								adding={true}
								cancel={this.props.showNewItem.bind(this,false)}
								confirm={this.props.addLocation}
								key={-1} />);
			}

		}

		return (<div>
				<table
					className="mdl-data-table mdl-js-data-table mdl-shadow--2dp"
					style={{width:"100%"}}>
					<thead>
						<tr>
							<th className="mdl-data-table__cell--non-numeric">Description</th>
							<th className="remember-direction-col">Direction</th>
							<th className="remember-distance-col">Distance (km)</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				</div>);
	}
}
