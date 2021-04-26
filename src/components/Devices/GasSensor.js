import { Box, makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import '../../styles/Gassensor.css';
import thingSpeakAPI from '../../utils/axios';
import { ThingSpeakReadAPI } from '../../utils/utils';
import WarningIcon from '@material-ui/icons/Warning';

function Gassensor() {
	const useStyles = makeStyles(() => ({
		smoke: {
			color: '#C62828',
			marginBottom: 5,
			marginLeft: 5,
		},
	}));
	const classes = useStyles();
	const [state, setState] = useState(0);

	useEffect(() => {
		const Gas = async () => {
			try {
				const res = await thingSpeakAPI.get(ThingSpeakReadAPI(8));
				console.log(res.data, 'Gas Sensor');
				setState(res?.data);
			} catch (err) {
				console.log(err);
			}
		};
		const interval = setInterval(async () => {
			Gas();
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Typography variant='h6' style={{ marginTop: 5, marginLeft: -4 }}>
			<p>
				Gas Sensor Value: <b style={{ color: state > 150 ? '#f35656' : '#018c63' }}>{state} m³ </b>
				{''}
			</p>
			<Box fontSize={25} fontWeight={900} m={1}>
				{state > 150 ? (
					<div className='reading__danger'>
						<WarningIcon className={classes.smoke} />
						<p>Smoke Detected</p>
					</div>
				) : (
					<Typography style={{ marginLeft: -8 }} variant='h6' color='error'>
						No Smoke
					</Typography>
				)}
			</Box>
		</Typography>
	);
}

export default Gassensor;
