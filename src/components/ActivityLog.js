import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Graphs from './Graphs';
import TimelineIcon from '@material-ui/icons/Timeline';

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: -60,
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: '#05716c',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(0.7, 1, 0.7, 1),
	},
	btn: {
		fontSize: 18,
		transition: 'transform .2s',
		'&:hover': {
			transform: 'scale(1.2)',
		},
	},
}));

function ActivityLog() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Button
				className={classes.btn}
				color='primary'
				style={{ height: '100%', width: '100%' }}
				onClick={handleOpen}
				startIcon={<TimelineIcon color='secondary' />}>
				Activity Log
			</Button>
			<Modal
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<div className={classes.paper}>
						<Graphs />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default ActivityLog;
