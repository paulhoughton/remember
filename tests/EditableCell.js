import test from "tape";
import React from "react/addons";
import EditableCell from "../src/components/EditableCell"; 

function createComponent(component, props, ...children) {
	const shallowRenderer = React.addons.TestUtils.createRenderer();
	shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
	return shallowRenderer.getRenderOutput();
}

test("EditableCell test", function (assert) {
	let component = createComponent(EditableCell, { value: "Display Text", confirm: ()=>{} });
	assert.equal(component.type,"td","should return a table cell");
	assert.equal(component._store.props.children,"Display Text","should display text");
	assert.end();
});

test("EditableCell adding test", function (assert) {
	let component = createComponent(EditableCell, { adding: true, confirm: ()=>{} });
	assert.equal(component.type,"td","should return a table cell");
	assert.equal(component._store.props.children[0]._store.props.children[0].type,"input","should allow input");
	assert.equal(component._store.props.children.filter(d=>d.type==="i").length,2,"should have 2 icons");
	assert.end();
});
