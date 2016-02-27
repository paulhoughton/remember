import React from 'react';
import TestUtils from 'react-addons-test-utils';

export default function (component, props) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(component, props));
  return shallowRenderer.getRenderOutput();
}
