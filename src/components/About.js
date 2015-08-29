import React, { Component, PropTypes } from "react";

class About extends Component {
	render() {

		const center = {
			position: "absolute",
			top: "30%",
			left: "50%",
			margin: "0 0 0 -165px",
			textAlign: "center"
		};

		return (
			<section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
				<div className="mdl-card mdl-shadow--2dp" style={center}>
					<div className="mdl-card__title mdl-card--expand">
						<h2 className="mdl-card__title-text">Remember</h2>
					</div>
					<div className="mdl-card__supporting-text">
						<h6>Version 1.0</h6>
						<a href="https://github.com/paulhoughton/remember">Github</a>
					</div>
					<div className="mdl-card__actions mdl-card--border">
						<a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
							onClick={this.props.ok}>
								OK
						</a>
					</div>
				</div>
			</section>
		);
	}
}
About.propTypes = {
	ok: PropTypes.func.isRequired
};

export default About;
