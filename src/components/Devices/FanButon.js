import { FormControlLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ThingSpeakReadAPI, ThingSpeakWriteAPI } from '../../utils/utils';
import thingSpeakAPI from '../../utils/axios';
import IOSSwitch from '../IOSSwitch';

function FanButon() {
  const [state, setState] = useState(false);

  useEffect(() => {
    const onOff = async () => {
      try {
        const res = await thingSpeakAPI.get(ThingSpeakReadAPI(4));
        console.log(res.data, 'fan');
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
      await thingSpeakAPI(ThingSpeakWriteAPI(`field4=${data}`));
      console.log(e.target.checked, 'status');
    } catch (err) {
      setState(!e.target.checked);
      console.log(err);
    }
  };

  return (
    <FormControlLabel
      control={<IOSSwitch name='Fan' id='4' checked={state} onChange={(e) => handleChange(e)} />}
      label='Fan'
    />
  );
}

export default FanButon;
