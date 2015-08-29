import test from "tape";
import React from "react/addons";
import TableRow from "../src/components/TableRow"; 

function createComponent(component, props, ...children) {
	const shallowRenderer = React.addons.TestUtils.createRenderer();
	shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
	return shallowRenderer.getRenderOutput();
}

test("TableRow test", function (assert) {
	let component = createComponent(TableRow, { 
		geo: {lat:51.49948, lon:-0.12481, orientation:0},
		lat: 51.50136, lon:-0.14189,
		desc:"Description",
		dist:2.12345,
		confirm:()=>{}});
	assert.equal(component.type,"tr","should return a table row");
	assert.equal(component._store.props.children.length,3,"should have 3 cells");
	assert.equal(component._store.props.children[0]._store.props.value,"Description","should display the description");
	assert.equal(component._store.props.children[2]._store.props.children, 2.1, "should display the distance");
	assert.end();
});

test("TableRow detailed test", function (assert) {
	let component = createComponent(TableRow, { 
		geo: {lat:51.49948, lon:-0.12481, orientation:0},
		lat: 51.50136, lon:-0.14189,
		desc:"Description",
		dist:2.12345,
		detailed: true,
		confirm:()=>{}});
	assert.equal(component.type,"tr","should return a table row");
	assert.equal(component._store.props.children.length,3,"should have 3 cells");
	assert.equal(component._store.props.children[0]._store.props.value,"Description","should display the description");
	assert.equal(component._store.props.children[2]._store.props.children, 2.123, "should display the distance to 3 decimals places");
	assert.end();
});

test("Proximity test", function (assert) {
	let component = createComponent(TableRow, { 
		geo: {lat:0, lon:0, orientation:0},
		lat: 0, lon:0,
		desc:"",
		dist:0.017,
		confirm:()=>{}});
	assert.equal(component._store.props.children[1]._store.props.children.props.children, "star", "should display star");
	assert.end();
});


test("Compass north test", function (assert) {
	let component = createComponent(TableRow, { 
		geo: {lat:51.49948, lon:-0.12481, orientation:0},
		lat: 51.50136, lon:-0.14189,
		desc:"",
		dist:2.15,
		confirm:()=>{}});
	assert.equal(component._store.props.children[1]._store.props.children._store.props.style.transform, "rotate(280deg)", "should be rotated 280 degrees");
	assert.end();
});

test("Compass south test", function (assert) {
	let component = createComponent(TableRow, { 
		geo: {lat:51.49948, lon:-0.12481, orientation:180},
		lat: 51.50136, lon:-0.14189,
		desc:"",
		dist:2.15,
		confirm:()=>{}});
	assert.equal(component._store.props.children[1]._store.props.children._store.props.style.transform, "rotate(100deg)", "should be rotated 100 degrees");
	assert.end();
});
