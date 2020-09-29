import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UserData from './UserData';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '500px',
    background: '#edf5f5',
    margin: '60px 40px 0 40px',
  },
}));


export default function MainGrid() {


  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
            <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
          <Paper className={classes.paper}>
              <UserData />
          </Paper>
            </div>
        </Grid>
      </Grid>
    </div>
  );
}
