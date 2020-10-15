import React, { useState, useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ContextAuth } from "../App";
import * as firebase from "firebase/app";
import "firebase/auth";
import config from "./../util/config";
import { validataSigninData } from "../util/validators";

firebase.initializeApp(config);

const useStyles = makeStyles(() => ({
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [authenticated, setAuthenticated] = useContext(ContextAuth);
  const classes = useStyles();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    const { valid, errors } = validataSigninData(userData);

    if (!valid) {
      setErrors(errors);
    } else
      firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then((data) => {
          return data.user.getIdToken();
        })
        .then((IdToken) => {
          const FBIdToken = `Bearer ${IdToken}`;
          localStorage.setItem("FBIdToken", FBIdToken);
          axios.defaults.headers.common["Authorization"] = FBIdToken;
          axios.defaults.headers.post["Content-Type"] = "application/json";
          return axios.post("/signin");
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
  };

  const handleAuth = () => {
    setAuthenticated(true);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Login;
