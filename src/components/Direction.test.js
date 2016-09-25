jest.mock('react-dom');
import React from 'react';

import renderer from 'react-test-renderer';
import Direction from './Direction';

test('Direction test', () => {
  const params = {
    geo: {
      longitude: 51.49948,
      latitude: -0.12481
    },
    longitude: 51.50136,
    latitude: -0.14189,
    dist: 2.12345
  };

  const component = renderer.create(<Direction {...params} />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Proximity test', () => {
  const params = {
    geo: {
      longitude: 1,
      latitude: 1
    },
    longitude: 1,
    latitude: 1,
    dist: 0.019
  };

  const component = renderer.create(<Direction {...params} />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Pre population test', () => {
  const component = renderer.create(<Direction/>);
  expect(component.toJSON()).toMatchSnapshot();
});
