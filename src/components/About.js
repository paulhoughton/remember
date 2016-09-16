import React from 'react';
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import { Link } from 'react-router';
import { VERSION } from '../constants';

export default () => (
  <Card shadow={0} style={{ margin: 'auto', textAlign: 'center' }}>
    <CardTitle style={{ margin: 'auto' }}>Remember</CardTitle>
    <CardText>
      Version {VERSION}<br/><br/>
      <a href="https://github.com/paulhoughton/remember/">Github</a>
    </CardText>
    <CardActions border>
      <Link to="/"><Button colored>OK</Button></Link>
    </CardActions>
  </Card>
);
