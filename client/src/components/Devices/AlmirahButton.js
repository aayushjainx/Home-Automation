import { FormControlLabel, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ThingSpeakReadAPI, ThingSpeakWriteAPI } from '../../utils/utils';
import thingSpeakAPI from '../../utils/axios';
import IOSSwitch from '../IOSSwitch';
import { useSelector } from 'react-redux';
import { selectIntruder } from '../../features/intruderSlice';

function AlmirahButton() {
	const [state, setState] = useState(false);
	var intruder = useSelector(selectIntruder);

	useEffect(() => {
		const onOff = async () => {
			try {
				const res = await thingSpeakAPI.get(ThingSpeakReadAPI(5));
				console.log(res.data, 'Almirah');
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
			await thingSpeakAPI.post(ThingSpeakWriteAPI(`field5=${data}`));
			console.log(e.target.checked, 'status');
		} catch (err) {
			setState(!e.target.checked);
			console.log(err);
		}
	};

	return (
		<FormControlLabel
			control={
				<IOSSwitch
					name='Almirah'
					id='5'
					checked={state}
					onChange={(e) => handleChange(e)}
					disabled={intruder}
				/>
			}
			label={<Typography variant='h6'>Almirah</Typography>}
		/>
	);
}

export default AlmirahButton;
