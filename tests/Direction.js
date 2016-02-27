import test from 'ava';
import Direction from '../src/components/Direction';

import createComponent from '../src/helpers/createComponent';

test('Direction test', t => {
  const component = createComponent(Direction, 
    {
      geo: {
        longitude: 51.49948,
        latitude: -0.12481
      },
      longitude: 51.50136,
      latitude: -0.14189,
      dist: 2.12345
    }
  );

  t.is(component.props.name, 'navigation');
  t.is(component.props.style.transform, 'rotate(173deg)');
  t.pass();
});

test('Proximity test', t => {
  const component = createComponent(Direction,
    {
      geo: {
        longitude: 1,
        latitude: 1
      },
      longitude: 1,
      latitude: 1,
      dist: 0.019
    }
  );

  t.is(component.props.name, 'star');

  const component1 = createComponent(Direction,
    {
      geo: {
        longitude: 1,
        latitude: 1
      },
      longitude: 1,
      latitude: 1,
      dist: 0.2
    }
  );

  t.is(component1.props.name, 'navigation');
});

test('Pre population test', t => {
  const component = createComponent(Direction, {});
  t.is(component.type, 'div');

  const component1 = createComponent(Direction,
    {
      geo: {
        longitude: 0,
        latitude: 0
      },
      longitude: 0,
      latitude: 0,
      dist: 0
    }
  );
  t.is(component1.type, 'div');
});
