import React, { Component, PropTypes } from "react";

class EditableCell extends Component {
	constructor(props) {
		super(props);
		this.state = {editing: false};
	}
	setEdit(status){
		this.setState({editing:status});
	}
	confirmLocation(){
		if (this.state.editing) this.props.deleteRow(this.props.row);
		this.props.confirm(this.refs.newDesc.getDOMNode().value);
		this.setEdit(false);
	}
	deleteLocation(){
		this.props.deleteRow(this.props.row);
		this.setEdit(false);
	}
	checkSubmit(e){
		if (e.key === "Enter") this.confirmLocation();
	}
	render(){

		if (this.props.adding){
			return (
				<td className="mdl-data-table__cell--non-numeric">
					<input autoFocus={true}
						onKeyDown={this.checkSubmit.bind(this)}
						ref="newDesc"
						style={{width:"calc(100% - 48px)", maxWidth:"300px"}}/>
					<i className="material-icons" onClick={this.confirmLocation.bind(this)}>check_circle</i>
					<i className="material-icons" onClick={this.props.cancel}>cancel</i>
				</td>
			);
		}

		if (this.state.editing){
			return (<td className="mdl-data-table__cell--non-numeric">
					<input autoFocus={true}
						defaultValue={this.props.value} 
						onKeyDown={this.checkSubmit.bind(this)}
						ref="newDesc" 
						style={{width:"calc(100% - 72px)", maxWidth:"300px"}} />
						<i className="material-icons" onClick={this.confirmLocation.bind(this)}>check_circle</i>
						<i className="material-icons" onClick={this.setEdit.bind(this,false)}>cancel</i>
						<i className="material-icons" onClick={this.deleteLocation.bind(this)}>delete</i>
					</td>);

		}
		else
		{
			return (<td className="mdl-data-table__cell--non-numeric" onClick={this.setEdit.bind(this, true)}>
						{this.props.value}
					</td>);
		}		
	}
}
EditableCell.propTypes = {
	adding: PropTypes.bool,
	cancel: PropTypes.func,
	confirm: PropTypes.func.isRequired,
	deleteRow: PropTypes.func,
	row: PropTypes.number,
	value: PropTypes.string
};
export default EditableCell;
