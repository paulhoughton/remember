import React, { Component, PropTypes } from "react";
import EditableCell from "./EditableCell";
import helpers from "../helpers";

class TableRow extends Component {
	updateLocation(d){
		this.props.confirm(d, this.props.lat, this.props.lon);
	}
	render() {
		const centerText={textAlign: "center"};

		function cssRotation(deg) {
			return {
				transform:"rotate("+ Math.floor(deg)+ "deg)"
			};
		}

		if (this.props.adding){
			return(<tr>
					<EditableCell
						adding={true}
						cancel={this.props.cancel}
						confirm={this.props.confirm} />
				</tr>);
		}

		let deg=helpers.getDegrees(this.props.geo.lat,
									this.props.geo.lon,
									this.props.lat,
									this.props.lon);

		let orient=360-(720-this.props.geo.orientation-deg)%360;

		let icon = this.props.dist<0.02?
					<i className="material-icons">star</i>:
					<i className="material-icons" style={cssRotation(orient, this.props)}>navigation</i>;

		return(<tr>
				<EditableCell
					confirm={this.updateLocation.bind(this)}
					deleteRow={this.props.deleteRow}
					row={this.props.row}
					value={this.props.desc}/>
				<td style={centerText}>{icon}</td>
				<td>{helpers.round(this.props.dist, this.props.detailed?3:1)}</td>
			</tr>
		);
	}
}


TableRow.propTypes = {
	adding: PropTypes.bool,
	cancel: PropTypes.func,
	confirm: PropTypes.func,
	deleteRow: PropTypes.func,
	desc: PropTypes.string,
	detailed: PropTypes.bool,
	dist: PropTypes.number,
	geo: PropTypes.object,
	lat: PropTypes.number,
	lon: PropTypes.number,
	row: PropTypes.number
};

export default TableRow;
