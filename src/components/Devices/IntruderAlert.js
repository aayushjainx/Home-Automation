import { FormControlLabel, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { ThingSpeakReadAPI, ThingSpeakWriteAPI } from '../../utils/utils';
import thingSpeakAPI from '../../utils/axios';
import IOSSwitch from '../IOSSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { on, off, selectIntruder } from '../../features/intruderSlice';

function IntruderAlert() {
  //const [state, setState] = useState(false);
  const dispatch = useDispatch();
  var intruder = useSelector(selectIntruder);

  useEffect(() => {
    const onOff = async () => {
      try {
        const res = await thingSpeakAPI.get(ThingSpeakReadAPI(6));
        console.log(res.data, 'IntruderAlert');
        if (res?.data === 1) dispatch(on());
      } catch (err) {
        console.log(err);
      }
    };
    //const interval = setInterval(async () => {
    onOff();
    // }, 10000);
    // return () => clearInterval(interval);
  }, [dispatch]);

  const handleChange = async (e) => {
    var data = e.target.checked === false ? 0 : 1;
    try {
      //setState(e.target.checked);
      if (data === 0 ? dispatch(off()) : dispatch(on()));
      await thingSpeakAPI.post(ThingSpeakWriteAPI(`field6=${data}`));
      console.log(e.target.checked, 'status');
    } catch (err) {
      //setState(!e.target.checked);
      if (data === 1 ? dispatch(off()) : dispatch(on()));
      console.log(err);
    }
  };

  return (
    <>
      <FormControlLabel
        style={{ marginLeft: -2 }}
        control={
          <IOSSwitch
            name='intruderalert'
            id='6'
            checked={intruder}
            onChange={(e) => handleChange(e)}
          />
        }
        label={<Typography variant='h6'>Intruder Alert</Typography>}
      />
    </>
  );
}

export default IntruderAlert;
