import React, { useState,useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { validataChildSignupData } from "./validators";
import * as firebase from "firebase/app";
import "firebase/auth";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { ContextAdmin } from "../pages/home";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ContextReAuth,ContextAdminOpen } from "../components/sheet/AdminSheet";
import CircularStatic from "../components/timer/CircularCountdown";
import { ContactSupportOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  typography: {
    useNextVariants: true,
  },
  form: {
    textAlign: "center",
    flexDirection: "column"
  },
  blank: {
    margin: theme.spacing(0,30)
  },
  textField: {
    display: "flex"
  },
  button: {
    margin: theme.spacing(2,3)
  },
  back: {
    flexDirection:"row",
    padding: theme.spacing(1,12)
  },
  backBtn: {
    display: "flex",
    flex: "1"
  },
  circular: {
    display: "flex",
    flex: "1"
  }
}));

const CreateChild = () => {
  const [email, setEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [childName, setChildName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [label, setlabel] = useState("")
  const {userData} = useContext(ContextAdmin)
  const [reAuthenticated,setReAuthenticated] = useContext(ContextReAuth)
  const [adminOpen,setAdminOpen] = useContext(ContextAdminOpen)
  const classes = useStyles();
  const handleChildName = (e) => {
    setChildName(e.target.value);
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
  const handleOpen = () => {
    setReAuthenticated(!reAuthenticated)
    setAdminOpen(!adminOpen)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const childData = {
      email: email,
      confirmedEmail: confirmedEmail,
      password: password,
      confirmedPassword: confirmedPassword,
      childName: childName,
      address: address,
      tel: tel,
    };
    const { errors, valid } = validataChildSignupData(childData);

    let userId;
    if (!valid) {
      setErrors(errors);
    } else
      firebase
        .auth()
        .createUserWithEmailAndPassword(childData.email, childData.password)
        .then((data) => {
          console.log(data.user.uid);
          return userId = data.user.uid
        })
        .then(() => {
          const userCredentials = {
            email: email,
            childName: childName,
            address: address,
            tel: tel,
            userId: userId,
          };
          /*
          const FBIdToken = `Bearer ${IdToken}`;
          localStorage.setItems("FBIdToken", FBIdToken);
          axios.defaults.headers.common["Authorization"] = FBIdToken;
          axios.defaults.headers.post["Content-Type"] = "application/json";
          */
          return axios.post("/childsignup", userCredentials);
        })
        .then((res) => {
          alert(res.data.message);
          return handleOpen();
        })
        .catch(() => {
          alert("something went wrong");
          return handleOpen();
        })
  };
  return (
    <Paper>
      <div className={classes.form}>
      <div className={classes.blank}>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          helperText={errors.email}
          error={errors.email ? true : false}
          className={classes.textField}
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
          value={password}
          onChange={handlePassword}
        />
        <TextField
          id="confirmedPassword"
          name="confirmedPassword"
          type="password"
          label="ConfirmedPassword"
          helperText={errors.confirmedPassword}
          error={errors.confirmedPassword ? true : false}
          className={classes.textField}
          fullWidth
          value={confirmedPassword}
          onChange={handleConfirmedPassword}
        />
        <TextField
          id="userName"
          name="userName"
          type="userName"
          label="childName"
          helperText={errors.childName}
          error={errors.childName ? true : false}
          className={classes.textField}
          fullWidth
          value={childName}
          onChange={handleChildName}
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
        <div className={classes.back}>
          <div 
            className={classes.backBtn}>
          <Button
            color="default"
            onClick={handleOpen}
          >
            <ExitToAppIcon/>
          </Button>
          <div className={classes.circular} >
            <CircularStatic/>
          </div>
          </div>
        </div>
      </form>
      </div>
      </div>
    </Paper>
  );
};

export default CreateChild;

 