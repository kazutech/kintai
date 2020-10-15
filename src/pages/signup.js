import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CalendarPage from "../components/calendar/Calendar";
import Paper from "@material-ui/core/Paper";
import { validataSignupData } from "../util/validators";
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/auth";
import config from "./../util/config";
import { ContextAuth } from "../App";

const useStyles = makeStyles((theme) => ({
  typography: {
    useNextVariants: true,
  },
  form: {
    textAlign: "center",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
}));

const Signup = () => {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [errors, setErrors] = useState("");
  const [authenticated, setAuthenticated] = useContext(ContextAuth);
  const classes = useStyles();

  const handleOrgName = (e) => {
    setOrgName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmedEmail = (e) => {
    setConfirmedEmail(e.target.value);
  };
  const handleConfirmedPassword = (e) => {
    setConfirmedPassword(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleTel = (e) => {
    setTel(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userCredential = {
      email: email,
      confirmedEmail: confirmedEmail,
      password: password,
      confirmedPassword: confirmedPassword,
      orgName: orgName,
      address: address,
      tel: tel,
    };

    const { valid, errors } = validataSignupData(userCredential);

    if (!valid) {
      setErrors(errors);
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          userCredential.email,
          userCredential.password
        )
        .then((data) => {
          return data.user.getIdToken();
        })
        .then((IdToken) => {
          const FBIdToken = `Bearer ${IdToken}`;
          localStorage.setItems("FBIdToken", FBIdToken);
          axios.defaults.headers.common["Authorization"] = FBIdToken;
          axios.defaults.headers.post["Content-Type"] = "application/json";
          return axios.post("/signup", userCredential);
        })
        .then((res) => {
          localStorage.removeItem("FBIdToken");
          return firebase.auth().signInWithCustomToken(res.data.token);
        })
        .then((data) => {
          return data.user.getIdToken();
        })
        .then((token) => {
          const FBCTIdToken = `Bearer ${token}`;
          localStorage.setItem("FBCTIdToken", FBCTIdToken);
          axios.defaults.headers.common["Authorization"] = FBCTIdToken;
          axios.defaults.headers.post["Content-Type"] = "application/json";
          handleAuth();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    const handleAuth = () => {
      setAuthenticated(true);
    };
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={errors.email}
            error={errors.email ? true : false}
            className={classes.textField}
            fullWidth
            value={email}
            onChange={handleEmail}
          />
          <TextField
            id="confirmedEmail"
            name="confirmedEmail"
            type="confirmedEmail"
            label="ConfirmedEmail"
            helperText={errors.confirmedEmail}
            error={errors.confirmedEmail ? true : false}
            className={classes.textField}
            fullWidth
            value={confirmedEmail}
            onChange={handleConfirmedEmail}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors.password}
            error={errors.password ? true : false}
            className={classes.textField}
            fullWidth
            value={password}
            onChange={handlePassword}
          />
          <TextField
            id="confirmedPassword"
            name="confirmedPassword"
            type="confirmedPassword"
            label="ConfirmedPassword"
            helperText={errors.confirmedPassword}
            error={errors.confirmedPassword ? true : false}
            className={classes.textField}
            fullWidth
            value={confirmedPassword}
            onChange={handleConfirmedPassword}
          />
          <TextField
            id="orgName"
            name="orgName"
            type="orgName"
            label="OrgName"
            helperText={errors.orgName}
            error={errors.orgName ? true : false}
            className={classes.textField}
            fullWidth
            value={orgName}
            onChange={handleOrgName}
          />

          <TextField
            id="address"
            name="address"
            type="address"
            label="Address"
            helperText={errors.address}
            error={errors.address ? true : false}
            className={classes.textField}
            fullWidth
            value={address}
            onChange={handleAddress}
          />
          <TextField
            id="tel"
            name="tel"
            type="tel"
            label="Tel"
            helperText={errors.tel}
            error={errors.tel ? true : false}
            className={classes.textField}
            fullWidth
            value={tel}
            onChange={handleTel}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Signup
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};
export default Signup;
