import React, { Component, PropTypes } from "react";
import mdl from "exports?componentHandler!material-design-lite/material";
import About from "./About";
import AddButton from "./AddButton";
import Table from "./Table";
import helpers from "../helpers";
import {VERSION, DEMO_DATA} from "../constants";

export default class App extends Component {

	static propTypes ={
		addLocation: PropTypes.func.isRequired,
		data: PropTypes.array.isRequired,
		deleteLocation: PropTypes.func.isRequired,
		geo: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {detailed: false, newLocation:false};
	}
	componentDidUpdate() {
		mdl.upgradeDom();
	}
	addLocation(desc, lat, lon){
		this.props.addLocation(desc, lat, lon);
		this.setState({newLocation:false});
	}
	toggleDetail() {
		this.setState({detailed:!this.state.detailed});
		this.render();
	}
	showPage(page){
		this.setState({show:page});

		try {
			document.getElementsByClassName("mdl-layout__drawer")[0].classList.remove("is-visible");
		}
		catch(e){}
		this.render();
	}
	showNewItem(val){
		this.setState({newLocation:val});
	}
	warningMessage(message){
		alert(message);
	}
	render() {
		let main;
		let button;
		let showAddButton=false;

		switch (this.state.show) {
		case "about":
			main = <About ok={this.showPage.bind(this, "main")} version={VERSION} />;
			break;
		case "demo":
			main = (<Table
						addLocation = {()=>{}}
						data = {DEMO_DATA}
						deleteLocation = {()=>{}}
						detailed = {this.state.detailed}
						geo = {this.props.geo}
						newLocation = {false}
						updateDescription={this.props.updateDescription} />
					);
			break;
		default:
			showAddButton=true;
			main = (<Table
						addLocation = {::this.addLocation}
						data = {this.props.data}
						deleteLocation = {this.props.deleteLocation}
						detailed = {this.state.detailed}
						geo = {this.props.geo}
						newLocation = {this.state.newLocation}
						showNewItem = {::this.showNewItem}
						updateDescription={this.props.updateDescription} />
					);
		}
		if (!this.state.newLocation && showAddButton)
		{
			if (this.state.detailed) {
				var txt=`${helpers.round(this.props.geo.lat,3)},
					${helpers.round(this.props.geo.lon,3)}
					(${this.props.geo.orientation||0}°)`;
			}
			button=<AddButton add={this.showNewItem.bind(this,true)} additionalText={txt} geo={this.props.geo} />
		}

		let warnings=[];

		if (this.props.geo.orientation===undefined){
						warnings.push(<i className="material-icons"
											key={"noOrientation"}
											onClick={this.warningMessage.bind(this, "Orientation unavailable" )}
											style={{"color":"white"}}
											title="Orientation unavailable">navigation</i>);
					}
		if (this.props.geo.accuracy>100) {
			warnings.push(<i className="material-icons"
											key={"locationInaccurate"}
											onClick={this.warningMessage.bind(this, `Inaccurate location: ${this.props.geo.accuracy}m` )}
											title="Inaccurate location">error</i>);
		}
		if (this.props.geo.lastUpdate && new Date()-this.props.geo.lastUpdate>30000) {
			warnings.push(<i className="material-icons"
											key={"locationSlow"}
											onClick={this.warningMessage.bind(this, `Out of date location: ${Math.floor((new Date()-this.props.geo.lastUpdate)/1000)}s` )}
											title="Out of date location">location_searching</i>);
		}

		return(<div>
				{button}
				<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
					<header className="mdl-layout__header">
						<div className="mdl-layout__header-row">
							<span className="mdl-layout-title">Remember</span>
							{warnings}
							<div className="mdl-layout-spacer"></div>
						</div>
					</header>
					<div className="mdl-layout__drawer">
						<span className="mdl-layout-title" onClick={this.showPage.bind(this, "main")}>Remember</span>
						<nav className="mdl-navigation">
								<a className="mdl-navigation__link" href="#" onClick={this.showPage.bind(this, "about")}>
									<i className="material-icons">info_outline</i>About
								</a>
								<a className="mdl-navigation__link" href="#" onClick={this.showPage.bind(this, "demo")}>
									<i className="material-icons">explore</i>Demo
								</a>
								<a className="mdl-navigation__link" href="#">
								<i className="material-icons">bug_report</i>Detailed
										<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect"
											htmlFor="switch-detail"
											style={{marginLeft:"10px",width:"auto"}}>
										<input checked={this.state.detailed}
											className="mdl-switch__input"
											id="switch-detail"
											onChange={::this.toggleDetail} type="checkbox"/>
										<span className="mdl-switch__label"></span>
								</label>
								</a>
						</nav>
					</div>
					<main className="mdl-layout__content">
						{main}
					</main>
				</div>
			</div>);
	}

}
