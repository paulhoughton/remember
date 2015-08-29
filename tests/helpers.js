import test from "tape";
import helpers from "../src/helpers.js";

test('getDistanceFromLatLonInKm', function (assert) {
	const expected = 5569;
	const actual = helpers.getDistanceFromLatLonInKm(51.5072,-0.1275,40.7033,-73.9797);

	assert.equal(Math.floor(actual), expected,
		'should calculate distances in km');

	assert.end();
});

test('rounding', function (assert) {
  let actual = helpers.round(1.2345);

  assert.equal(actual, 1.2,
    'should default to 1dp');

  actual = helpers.round(1.2345,2);

  assert.equal(actual, 1.23,
    'should allow overriding of dp');

  assert.end();
});

test('degrees', function (assert) {
	const actual = helpers.getDegrees(51.5072,-0.1275,51.51385,-0.09835);

	assert.equal(Math.floor(actual), 69,
		"should calculate degrees");

	const actual1 = helpers.getDegrees(51.49948, -0.12481, 51.50136, -0.14189);

	assert.equal(Math.floor(actual1), 280,
		"should calculate degrees");

	assert.end();
});

