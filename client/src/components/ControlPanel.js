import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import IntruderAlert from './Devices/IntruderAlert';
import LightBulb from './Devices/LightBulb';
import AlmirahButton from './Devices/AlmirahButton';
import Fan from './Devices/Fan';
import ActivityLog from './ActivityLog';
import Temperature from './Devices/Temperature';
import '../styles/CircleRipple.scss';
import Buzzer from './Devices/Buzzer';
import Gassensor from './Devices/GasSensor';
import PirSensor from './Devices/PirSensor';

const useStyles = makeStyles((theme) => ({
	align: {
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		marginBottom: 10,
	},
}));

const defaultProps = {
	bgcolor: 'background.paper',
	borderColor: '#02353C',
	m: 3,
	pt: 3,
	border: 8,
	style: { width: '100%', height: '100%' },
};

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
				<Box display='flex' justifyContent='center' borderRadius={16} {...defaultProps}>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12} md={4} className={classes.align}>
								<IntruderAlert />
							</Grid>
							<Grid item xs={12} md={4} className={classes.align}>
								<LightBulb />
							</Grid>
							<Grid item xs={12} md={4} className={classes.align}>
								<Temperature />
							</Grid>
							<Grid item xs={12} md={4} className={classes.align}>
								<Fan />
							</Grid>
							<Grid item xs={12} md={4} className={classes.align}>
								<AlmirahButton />
							</Grid>
							<Grid item xs={12} md={4} className={classes.align}>
								<ActivityLog />
							</Grid>
							<Grid item xs={12} md={4} className={classes.align}>
								<Gassensor />
							</Grid>
							<Grid item xs={12} md={4} className={classes.align}>
								<PirSensor />
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}

export default ControlPanel;
