import { FormControlLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ThingSpeakReadAPI, ThingSpeakWriteAPI } from '../../utils/utils';
import thingSpeakAPI from '../../utils/axios';
import IOSSwitch from '../IOSSwitch';

function IntruderAlert() {
  const [state, setState] = useState(false);

  useEffect(() => {
    const onOff = async () => {
      try {
        const res = await thingSpeakAPI({
          method: 'get',
          url: ThingSpeakReadAPI(6),
        });
        console.log(res.data, 'IntruderAlert');
        setState(res?.data === 1 ? true : false);
      } catch (err) {
        console.log(err);
      }
    };
    //const interval = setInterval(async () => {
    onOff();
    // }, 10000);
    // return () => clearInterval(interval);
  }, []);

  const handleChange = async (e) => {
    var data = e.target.checked === false ? 0 : 1;
    try {
      setState(e.target.checked);
      await thingSpeakAPI({
        method: 'post',
        url: ThingSpeakWriteAPI(`field6=${data}`),
      });
      console.log(e.target.checked, 'status');
    } catch (err) {
      setState(!e.target.checked);
      console.log(err);
    }
  };

  return (
    <>
      <FormControlLabel
        control={<IOSSwitch name='intruderalert' id='6' checked={state} onChange={(e) => handleChange(e)} />}
        label='Intruder Alert'
      />
    </>
  );
}

export default IntruderAlert;
