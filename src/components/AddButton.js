import React from 'react';

export default ({add, additionalText, icon="add"}) => (
	<div className="remember-add-button">
		<span>{additionalText}</span>
		<button
			className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored bottom-right"
			onClick={add}
			style={{marginLeft: "10px"}}>
				<i className="material-icons">{icon}</i>
		</button>
	</div>
)