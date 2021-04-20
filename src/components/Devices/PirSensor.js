import { Box, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import "../../styles/Gassensor.css"
import thingSpeakAPI from "../../utils/axios";
import { ThingSpeakReadAPI } from "../../utils/utils";
import NotificationsIcon from '@material-ui/icons/Notifications';
import "../../styles/Pirsensor.css"


function PirSensor() {

    const useStyles = makeStyles(() => ({
        person: {
          color: 'gray',
          marginBottom: 5,
          marginLeft: 5,
        },
       
      }));
    const classes = useStyles();
    const [state, setState] = useState(0);

    useEffect(() => {
      const  Pir = async () => {
      try {
        const res = await thingSpeakAPI({
          method: 'get',
          url: ThingSpeakReadAPI(5),
        });
        console.log(res.data, 'Pir sensor');
        setState(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    const interval = setInterval(async () => {
      Pir();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

    return (
    
    <Typography variant='body1' style={{ marginTop: 5 }}>
      Pir Sensor Value:{' '}
      <Box fontSize={25} fontWeight={900} m={1}>
        {state ==1 ? <h2>Active</h2> : <h2>Inactive</h2>}  {''}
        {state==1 ? 
        <div className="reading__detetcted">
            <NotificationsIcon className={classes.person}/>
            <p>(Someone is there) </p>
        </div>    :
        <p>No one is there</p>
    } 
        
      </Box>
    </Typography>          
        
    )
}

export default PirSensor