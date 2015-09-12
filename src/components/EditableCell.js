import React, { Component, PropTypes } from "react";
const  mdl = (typeof window !== 'undefined') && require("exports?componentHandler!material-design-lite/material");

export default class EditableCell extends Component {

	static propTypes = {
		adding: PropTypes.bool,
		cancel: PropTypes.func,
		confirm: PropTypes.func.isRequired,
		deleteRow: PropTypes.func,
		row: PropTypes.number,
		value: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {editing: false};
	}
	componentDidUpdate(prevProps, prevState) {
		if (mdl) mdl.upgradeDom();
		if (this.state.editing && prevState.editing!=this.state.editing) {
			this.refs.newDesc.focus();
		}
	}
	setEdit(status){
		this.setState({editing:status});
	}
	confirmLocation(){
		this.props.confirm(this.refs.newDesc.value, this.props.row);
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
							onKeyDown={::this.checkSubmit}
							ref="newDesc"
							style={{display:"inline-block"}}/>
						<label className="mdl-textfield__label">Location...</label>
					</div>
					<i className="material-icons" onClick={::this.confirmLocation}>check_circle</i>
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
							onKeyDown={::this.checkSubmit}
							ref="newDesc"
							style={{display:"inline-block"}}/>
					<label className="mdl-textfield__label">Location...</label>
					</div>
						<i className="material-icons" onClick={::this.confirmLocation}>check_circle</i>
						<i className="material-icons" onClick={this.setEdit.bind(this,false)}>cancel</i>
						<i className="material-icons" onClick={::this.deleteLocation}>delete</i>
					</td>);

		}
		return (<td className="mdl-data-table__cell--non-numeric"
						onClick={this.setEdit.bind(this, true)}>
					{this.props.value}
				</td>);
	}
}
