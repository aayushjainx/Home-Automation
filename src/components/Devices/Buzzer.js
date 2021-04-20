import { Grid, Typography, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import thingSpeakAPI from '../../utils/axios';
import { ThingSpeakReadAPI } from '../../utils/utils';

function Buzzer() {
  const [buzzer, setBuzzer] = useState(false);

  useEffect(() => {
    const buzz = async () => {
      try {
        const res = await thingSpeakAPI({
          method: 'get',
          url: ThingSpeakReadAPI(7),
        });
        console.log(res.data, 'Buzzer');
        setBuzzer(res?.data === 1 ? true : false);
      } catch (err) {
        console.log(err);
      }
    };
    const interval = setInterval(async () => {
      buzz();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {buzzer ? (
        <>
          <Grid item xs={12} style={{ marginBottom: '3%' }}>
            <Grid container>
              <Grid container item xs={2} md={5} direction='row' justify='flex-end' alignItems='center'>
                <Box className={`${buzzer && 'circle-ripple'}`}></Box>
              </Grid>
              <Grid item xs={8} md={6} style={{ marginLeft: '3%' }}>
                <Typography variant='h6'>INTRUDER DETECTED! CALL 911! ASAP!</Typography>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
}

export default Buzzer;
