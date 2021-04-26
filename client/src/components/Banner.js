import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Hidden, Typography } from '@material-ui/core';
import { Jumbotron } from 'react-bootstrap';
import Tilty from 'react-tilty';

const useStyles = makeStyles((theme) => ({
  jumbo: {
    background: 'black no-repeat center',
    backgroundSize: 'cover',
    height: '100%',
  },
  jumbohead: {
    marginTop: 70,
    color: 'white',
  },
  tilty: {
    position: 'relative',
    width: '40%',
    height: '80%',
    transformStyle: 'preserve-3d',
    transform: 'perspective(1000px)',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: '100%',
  },
  inner: {
    display: 'inline-block',
    transform: 'translateZ(60px)',
    fontWeight: '500',
    fontSize: '2.5rem',
    color: 'white',
    letterSpacing: '0.15rem',
  },
}));
function Banner() {
  const classes = useStyles();

  return (
    <Grid style={{ height: '40vh' }}>
      <Jumbotron fluid className={classes.jumbo}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <Typography variant='h2' className={classes.jumbohead}>
                Welcome Back!
              </Typography>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12} md={3}>
                <Tilty className={classes.tilty} glare scale={1.3} maxGlare={0.0}>
                  <Typography variant='h6' className={classes.inner}>
                    🏠
                  </Typography>
                </Tilty>
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      </Jumbotron>
    </Grid>
  );
}

export default Banner;
