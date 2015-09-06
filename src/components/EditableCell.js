import React, { Component, PropTypes } from "react";
const  mdl = (typeof window !== 'undefined') && require("exports?componentHandler!material-design-lite/material");

class EditableCell extends Component {
	constructor(props) {
		super(props);
		this.state = {editing: false};
	}
	componentDidUpdate(prevProps, prevState) {
		if (mdl) mdl.upgradeDom();
		if (this.state.editing && prevState.editing!=this.state.editing) {
			this.refs.newDesc.getDOMNode().focus();
		}
	}
	setEdit(status){
		this.setState({editing:status});
	}
	confirmLocation(){
		this.props.confirm(this.refs.newDesc.getDOMNode().value, this.props.row);
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
				<td className="mdl-data-table__cell--non-numeric" colSpan={3}>
					<div className="mdl-textfield mdl-js-textfield" style={{width:"calc(100% - 48px)"}}>
						<input autoFocus={true}
							className="mdl-textfield__input"
							onKeyDown={this.checkSubmit.bind(this)}
							ref="newDesc"
							style={{display:"inline-block"}}/>
						<label className="mdl-textfield__label">Location...</label>
					</div>
					<i className="material-icons" onClick={this.confirmLocation.bind(this)}>check_circle</i>
					<i className="material-icons" onClick={this.props.cancel}>cancel</i>
				</td>
			);
		}

		if (this.state.editing){
			return (<td className="mdl-data-table__cell--non-numeric">
				<div className="mdl-textfield mdl-js-textfield"
				style={{width:"calc(100% - 72px)"}}>
					<input className="mdl-textfield__input"
							defaultValue={this.props.value}
							onKeyDown={this.checkSubmit.bind(this)}
							ref="newDesc"
							style={{display:"inline-block"}}/>
					<label className="mdl-textfield__label">Location...</label>
					</div>
						<i className="material-icons" onClick={this.confirmLocation.bind(this)}>check_circle</i>
						<i className="material-icons" onClick={this.setEdit.bind(this,false)}>cancel</i>
						<i className="material-icons" onClick={this.deleteLocation.bind(this)}>delete</i>
					</td>);

		}
		return (<td className="mdl-data-table__cell--non-numeric"
						onClick={this.setEdit.bind(this, true)}>
					{this.props.value}
				</td>);
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
