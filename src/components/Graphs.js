import { Grid } from '@material-ui/core';
import React from 'react';
import { GraphsRead } from '../utils/utils';
import Graphitem from './Graphitem';

function Graphs() {
  return (
    <Grid style={{ marginLeft: '0px', marginRight: '0px', padding: '0px' }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={4}>
          <Graphitem title='Temperature' link={GraphsRead(1)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Graphitem title='Ultrasonic' link={GraphsRead(2)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Graphitem title='Light-Button' link={GraphsRead(3)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Graphitem title='Photo-Resistor' link={GraphsRead(4)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Graphitem title='Pir-Sensor' link={GraphsRead(5)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Graphitem title='Intruder-Button' link={GraphsRead(6)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Graphitem title='Buzzer' link={GraphsRead(7)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Graphitem title='Gas-Sensor' link={GraphsRead(8)} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Graphs;
