import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import thingSpeakAPI from '../../utils/axios';
import { ThingSpeakReadAPI } from '../../utils/utils';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const useStyles = makeStyles(() => ({
  heat: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 5,
  },
  cold: {
    color: 'blue',
    marginBottom: 5,
    marginLeft: 5,
  },
}));

function Temperature() {
  const classes = useStyles();
  const [state, setState] = useState(0);

  useEffect(() => {
    const temp = async () => {
      try {
        const res = await thingSpeakAPI({
          method: 'get',
          url: ThingSpeakReadAPI(1),
        });
        console.log(res.data, 'temperature');
        setState(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    const interval = setInterval(async () => {
      temp();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  return (
    <Typography variant='body1' style={{ marginTop: 5 }}>
      Your Room Temperature:{' '}
      <Box fontSize={25} fontWeight={900} m={1}>
        {state}° C | {toFahrenheit(state)}° F{' '}
        {state > 20 ? <WhatshotIcon className={classes.heat} /> : <AcUnitIcon className={classes.cold} />}
      </Box>
    </Typography>
  );
}

export default Temperature;
