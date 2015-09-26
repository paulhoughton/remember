import React, { Component, PropTypes } from "react";
import EditableCell from "./EditableCell";
import helpers from "../helpers";

export default class TableRow extends Component {

	static propTypes = {
		adding: PropTypes.bool,
		cancel: PropTypes.func,
		confirm: PropTypes.func.isRequired,
		deleteRow: PropTypes.func,
		desc: PropTypes.string,
		detailed: PropTypes.bool,
		dist: PropTypes.number,
		geo: PropTypes.object,
		lat: PropTypes.number,
		lon: PropTypes.number,
		row: PropTypes.number
	};

	render() {
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

		let orient=360-(720-(this.props.geo.orientation||0)-deg)%360;

		let icon = this.props.dist<0.02?
					<i className="material-icons">star</i>:
					<i className="material-icons" style={{transform:`rotate(${Math.floor(orient)}deg)`}}>navigation</i>;

		return(<tr>
				<EditableCell
					confirm={this.props.updateDescription}
					deleteRow={this.props.deleteRow}
					row={this.props.row}
					value={this.props.desc}/>
				<td style={{textAlign: "center"}}>{icon}</td>
				<td>{helpers.round(this.props.dist, this.props.detailed?3:1)}</td>
			</tr>
		);
	}
}
