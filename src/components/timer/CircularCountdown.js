import React, {useState,useEffect,useContext} from "react";
import { makeStyles } from  "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { ContextAdminOpen,ContextReAuth } from "../sheet/AdminSheet";

const useStyles = makeStyles((theme) => ({
    /*
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),  
    },
  }
  */
}))

export default function CircularStatic() {
    const classes = useStyles();
    const [progress, setProgress] = useState(0);
    const [adminOpen,setAdminOpen] = useContext(ContextAdminOpen)
    const [reAuthenticated,setReAuthenticated] = useContext(ContextReAuth)
  
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (
            prevProgress >= 100 ? !reAuthenticated ? 0 : adminOpen ? setAdminOpen(!adminOpen) : prevProgress + 1 : prevProgress + 1
            ));
      }, 300);
      return () => {
        clearInterval(timer);
      };
    }, []);

  
    return (
      <div className={classes.root}>
        <CircularProgress variant="static" value={progress} />
      </div>
    );
  }