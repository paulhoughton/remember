jest.mock('react-dom');
import React from 'react';

import { createRenderer } from 'react-test-renderer/shallow';
import Direction from './Direction';

const shallowRenderer = createRenderer();

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

  shallowRenderer.render(<Direction {...params} />);
  expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
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

  shallowRenderer.render(<Direction {...params} />);
  expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
});

test('Pre population test', () => {
  shallowRenderer.render(<Direction/>);
  expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
});
