import React, { Fragment, useContext, useState,createContext } from "react";
import { ContextAdmin, ContextType } from "../../pages/home";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import "firebase/auth";
import * as firebase from "firebase/app";
import CreateChild from "../../util/createChild";
import { validataSigninData } from "../../util/validators";
import CircularStatic from "../timer/CircularCountdown";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  home : {
    margin: "10 auto 10 auto",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(3, 3),
  },
  userName: {
    flex: "7"
  },
  adminBtn: {
    flex: "1"
  },
  parentData: {
    display: "flex",
    justifyContent: "space-between",
  },

  parentAdmin: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 15),
  },
  adminCd: {
    flexDirection: "column",
    flex: "8",
    padding: theme.spacing(3, 1),
  },
  submit: {
    flex: "4",
    flexDirection: "column",
    padding: theme.spacing(5, 0),
  },
  submitBtn: {
    textAlign: "center",
    padding: theme.spacing(0.5, 0),
    
  },
  icon: {
    textAlign: "center",
    padding: theme.spacing(0.5, 0),
  },
  circular: {
    flex: "1",
    padding: theme.spacing(8, 0),
  },

  /*
  home: {
    justifyItems: "right",
    padding: theme.spacing(3, 3),
  },
  btn: {
    justifyContent: "flex-end",
  },
  parentData: {
    display: "flex",
    justifyContent: "space-between",
  },
  parentAdmin: {
    padding: theme.spacing(3, 3),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  adminCd: {
    flexDirection: "column",
    marginRight: "20px",
  },
  adminBtn: {
    margin: "auto 0 auto 0",
  },
  */
}));

export const ContextAdminOpen = createContext([null, () => {}]);
export const ContextReAuth = createContext([null,() => {}]);

const AdminSheet = () => {
  const classes = useStyles();
  const userData = useContext(ContextAdmin);
  const typeName = useContext(ContextType);
  const [adminOpen, setAdminOpen] = useState(false);
  const [reAuthenticated, setReAuthenticated] = useState(false);
  const [adminEm, setAdminEm] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const [errors, setErrors] = useState("");

  const handleOpen = () => {
    setAdminOpen(!adminOpen);
  };

  const handleAdminEm = (e) => {
    setAdminEm(e.target.value);
  };

  const handleAdminPw = (e) => {
    setAdminPw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminData = {
      email: adminEm,
      password: adminPw,
    };

    const { errors, valid } = validataSigninData(adminData);

    if (!valid) {
      setErrors(errors);
    } else
      firebase
        .auth()
        .signInWithEmailAndPassword(adminData.email, adminData.password)
        .then((data) => {
          return firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (user.uid === data.user.uid) {
              return setReAuthenticated(!reAuthenticated);
            } else return new Error();
          });
        })
        .catch(() => {
          setAdminOpen(!adminOpen);
        });
  };
  /*
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
        userIdData.userId = data.user.uid;
        axios.post("/admin", userIdData);
      })
      .catch((err) => {
        console.error(err);
      });
      */

  return userData === null ? null : !reAuthenticated ? (
    <ContextAdminOpen.Provider value={[adminOpen,setAdminOpen]}>
      <ContextReAuth.Provider value={[reAuthenticated,setReAuthenticated]}>
        <CreateChild />
      </ContextReAuth.Provider>
    </ContextAdminOpen.Provider>
  ) : !adminOpen ? (
    <Paper className={classes.home}>
        <Typography variant="h5" className={classes.userName}>
          {typeName}:{userData.userName}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.adminBtn}
          onClick={handleOpen}
        >
          管理者画面
        </Button>
    </Paper>
  ) : (
    <Paper className={classes.parentAdmin}>
      <div className={classes.adminCd}>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={errors.email}
            error={errors.email ? true : false}
            fullWidth
            value={adminEm}
            onChange={handleAdminEm}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors.password}
            error={errors.password ? true : false}
            fullWidth
            value={adminPw}
            onChange={handleAdminPw}
          />
        </form>
      </div>
      <div className={classes.submit}>
        <div className={classes.submitBtn}>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
          ログイン
          </Button>
          </div>
          <div className={classes.icon}>
          <Button
            color="default"
            onClick={handleOpen}
          >
            <ExitToAppIcon/>
          </Button>
        </div>
      </div>
      <div className={classes.circular}>
        <ContextAdminOpen.Provider value={[adminOpen,setAdminOpen]}>
          <ContextReAuth.Provider value={[reAuthenticated,setReAuthenticated]}>
            <CircularStatic/>
          </ContextReAuth.Provider>
        </ContextAdminOpen.Provider>
      </div>
    </Paper>
  );
};
export default AdminSheet;
