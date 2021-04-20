import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import IntruderAlert from './Devices/IntruderAlert';
import LightBulb from './Devices/LightBulb';
import Temperature from './Devices/Temperature';
import '../styles/CircleRipple.scss';
import Buzzer from './Devices/Buzzer';
import Gassensor from './Devices/GasSensor';
import PirSensor from './Devices/PirSensor';

const useStyles = makeStyles((theme) => ({
  align: {
    justifyContent: 'center',
    display: 'flex',
    marginBottom: 10,
  },
}));

function ControlPanel() {
  const classes = useStyles();

  return (
    <Grid style={{ marginLeft: '30px', padding: '25px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4'>
            <Box fontWeight={500} m={1}>
              Control Panel
            </Box>
          </Typography>
        </Grid>
        <Buzzer />
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} md={4} className={classes.align}>
              <LightBulb />
            </Grid>
            <Grid item xs={12} md={4} className={classes.align}>
              <Temperature />
            </Grid>
            <Grid item xs={12} md={4} className={classes.align}>
              <IntruderAlert />
            </Grid>
            <Grid item xs={12} md={4} className={classes.align}>
              <Gassensor />
            </Grid>
            <Grid item xs={12} md={4} className={classes.align}>
              <PirSensor />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ControlPanel;
