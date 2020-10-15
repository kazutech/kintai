import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

const useStyles = makeStyles(theme => ({
  time: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(5, 3)
  },
  seconds: {
    fontSize: "medium",
    opacity: "0.5"
  }
}));

const Clock = () => {
  const classes = useStyles();
  dayjs.locale(ja);
  const Today = dayjs().format("YYYY年MMMMD日dddd");
  const [nowTime, setNowTime] = useState(dayjs().format("Ah時mm分"));
  const [nowSec, setNowSec] = useState(dayjs().format("ss"));
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(dayjs().format("Ah時mm分"));
      setNowSec(dayjs().format("ss"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Paper className={classes.time}>
      <Typography variant="h5" component="p" align="center">
        {Today}
      </Typography>
      <Typography variant="h3" component="p" align="center">
        {nowTime}
        <span className={classes.seconds}>{nowSec}</span>
      </Typography>
    </Paper>
  );
};

export default Clock;
