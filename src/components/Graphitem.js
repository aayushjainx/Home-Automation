import { Grid, makeStyles, Typography } from '@material-ui/core';
import Iframe from 'react-iframe'

const useStyles = makeStyles(() => ({
  title: {
    backgroundColor: '#0abb87',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    fontWeight: '400',
    borderBottom: '1px solid lightgray',
  },
}));
function Graphitem({ link, title }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} className={classes.title}>
        <Typography variant='h5'>{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Iframe width='100%' height='260px' src={link}></Iframe>
      </Grid>
    </Grid>
  );
}

export default Graphitem;
