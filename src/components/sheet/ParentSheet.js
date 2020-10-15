/*
import React, { Fragment, useContext, useState } from "react";
import { ContextParent } from "../../pages/home";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "firebase/auth";
import * as firebase from "firebase/app";
import CreateChild from "../../util/createChild";
import { validataSigninData } from "../../util/validators";

const useStyles = makeStyles((theme) => ({
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
}));

const ParentSheet = () => {
  const classes = useStyles();
  const parentData = useContext(ContextParent);
  const [adminOpen, setAdminOpen] = useState(false);
  const [reAuthenticated, setReAuthenticated] = useState(false);
  const [adminEm, setAdminEm] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const [errors, setErrors] = useState("");

  const handleOpen = (e) => {
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
    const userData = {
      email: adminEm,
      password: adminPw,
    };

    const { errors, valid } = validataSigninData(userData);

    if (!valid) {
      setErrors(errors);
    } else
      firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
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
      
  };

  if (parentData) {
    const parentSnippet = parentData.map((data) => {
      const { orgName, orgId, groupName, groupId, tenantName, tenantId } = data;
      if (orgName) {
        return <Typography variant="h5">会社名:{orgName}</Typography>;
      } else if (groupName) {
        return <Typography variant="h5">グループ名:{groupName}</Typography>;
      } else if (tenantName) {
        return <Typography variant="h5">店舗名:{tenantName}</Typography>;
      }
    });

    const renderPS = reAuthenticated ? (
      <CreateChild />
    ) : !adminOpen ? (
      <Paper className={classes.home}>
        <Typography variant="h5" component="h3" className={classes.parentData}>
          {parentSnippet}
          <Button
            variant="contained"
            color="primary"
            className={classes.parentBtn}
            onClick={handleOpen}
          >
            管理者画面
          </Button>
        </Typography>
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
        <div className={classes.adminBtn}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            ログイン
          </Button>
        </div>
      </Paper>
    );
    return renderPS;
  } else return null;
};

export default ParentSheet;
*/
