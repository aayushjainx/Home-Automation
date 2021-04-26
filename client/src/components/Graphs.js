import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Graphitem from './Graphitem';
import { Grid } from '@material-ui/core';
import { GraphsRead } from '../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: '92vh',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  card: {
    width: 1000,
    height: '96vh',
    backgroundColor: '#02353C',
  },
}));

function Graphs() {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant='outlined'>
      <CardContent>
        <div className={classes.root}>
          <GridList spacing={0} cellHeight={310} className={classes.gridList}>
            <Grid item xs={12} md={6}>
              <Graphitem title='Temperature' link={GraphsRead(1)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Graphitem title='Pir-Sensor' link={GraphsRead(2)} />{' '}
            </Grid>
            <Grid item xs={12} md={6}>
              <Graphitem title='Light-Button' link={GraphsRead(3)} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Graphitem title='Intruder-Button' link={GraphsRead(6)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Graphitem title='Almirah-Button' link={GraphsRead(5)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Graphitem title='Fan' link={GraphsRead(4)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Graphitem title='Buzzer' link={GraphsRead(7)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Graphitem title='Gas-Sensor' link={GraphsRead(8)} />
            </Grid>
          </GridList>
        </div>
      </CardContent>
    </Card>
  );
}

export default Graphs;
