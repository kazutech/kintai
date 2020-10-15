import React, { useContext, useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ContextOpen, ContextOneChild,ContextSheet } from "../../pages/home";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import TimeSnippet from "../timer/TimeSnippet";
import { validataAttendData } from "../../util/validators";
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  empTitle: {
    padding: theme.spacing(3),
  },
  staffName: {
    fontSize: "1em",
    borderBottom: "1px solid",
    margin: "1em auto 1.2em auto",
  },
  confirmedTime: {
    fontSize: "1em",
    borderBottom: "1px solid",
    margin: "1.2em auto 0 auto",
  },
  submitBtn: {
    margin: "1.2em auto 1.2em auto",
    textAlign: "center",
  },
  formControl: {
    width: "100%",
  },
}));

const Attendance = () => {
  const classes = useStyles();
  const [open, setOpen] = useContext(ContextOpen);
  const [userData, childClock, setChildClock] = useContext(ContextOneChild);
  const children = useContext(ContextSheet);
  const [submitStatus, setSubmitStatus] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  /*
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  */
  const handleChange = (e) => {
    setSubmitStatus(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const AttendingData = {
      submitStatus: submitStatus,
      submitTime: childClock,
    };

    const credential = {
      password: password,
      submitStatus: submitStatus
    };

    if(userData.email !== null) {
      credential.email = userData.email
    };

    const { valid, errors } = validataAttendData(credential)
    
    console.log(errors)
    if (!valid) {
      setErrors(errors);
    } else 
      firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, credential.password)
        .then((data) => {
            if (userData.userId === data.user.uid) {
              AttendingData.type = userData.type;
              AttendingData.userName = userData.userName;
              AttendingData.userId = userData.userId;
              return axios.post("/time", AttendingData);
            } else return new Error()
        })
        .then((res) => {
          alert(res.data.message);
          setOpen(!open);
        })
        .catch((err) => {
          console.error(err);
        });
  };

  return (
    <Grid container className={classes.submit}>
      <Grid item sm />
      <Grid item sm>
        <Typography className={classes.empTitle} variant="h4" align="center">
          勤怠管理
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Typography className={classes.staffName}>
            名前:
            {userData.userName}
          </Typography>
          <Typography className={classes.confirmedTime}>
            確定時刻:
            <ContextOneChild.Provider value={[setChildClock]}>
              <TimeSnippet />
            </ContextOneChild.Provider>
          </Typography>
          <FormControl className={classes.formControl} error={errors.submitStatus ? true : false}>
            <InputLabel id="submitStatus">勤務状況</InputLabel>
            <Select
              labelId="submitStatus"
              id="submitStatus"
              value={submitStatus}
              onChange={handleChange}
            >
              <MenuItem value={"active"}>出勤</MenuItem>
              <MenuItem value={"inactive"}>退勤</MenuItem>
              <MenuItem value={"break"}>休憩</MenuItem>
            </Select>
            <FormHelperText>{errors.submitStatus}</FormHelperText>
          </FormControl>
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors.password}
            error={errors.password ? true : false}
            fullWidth
            value={password}
            onChange={handlePassword}
          />
          <div className={classes.submitBtn}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </div>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Attendance;
