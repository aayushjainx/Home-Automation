import { Box, makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import '../../styles/Gassensor.css';
import thingSpeakAPI from '../../utils/axios';
import { ThingSpeakReadAPI } from '../../utils/utils';
import NotificationsIcon from '@material-ui/icons/Notifications';
import '../../styles/Pirsensor.css';

function PirSensor() {
  const useStyles = makeStyles(() => ({
    person: {
      color: '#C62828',
      marginBottom: 5,
      marginLeft: 5,
    },
  }));
  const classes = useStyles();
  const [state, setState] = useState(0);

  useEffect(() => {
    const Pir = async () => {
      try {
        const res = await thingSpeakAPI.get(ThingSpeakReadAPI(2));
        console.log(res.data, 'Pir sensor');
        setState(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    const interval = setInterval(async () => {
      Pir();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Typography variant='h6' style={{ marginTop: 5, marginLeft: 70 }}>
      <p>
        Pir Sensor Value:{' '}
        {state === 1 ? (
          <b style={{ color: '#f35656' }}>Active</b>
        ) : (
          <b style={{ color: '#018c63' }}>Inactive</b>
        )}{' '}
        {''}
      </p>
      <Box fontSize={25} fontWeight={900} m={1}>
        {state === 1 ? (
          <div className='reading__detetcted'>
            <NotificationsIcon className={classes.person} color='#C62828' />
            <p>Intruder Detected </p>
          </div>
        ) : (
          <Typography style={{ marginLeft: -8 }} variant='h6' color='error'>
            No one Detected
          </Typography>
        )}
      </Box>
    </Typography>
  );
}

export default PirSensor;
