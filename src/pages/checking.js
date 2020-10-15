/*
import React, { useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ContextAuth } from "../App";

const useStyles = makeStyles(() => ({
  circular: {
    textAlign: "center"
  }
}));
const Checking = () => {
  const classes = useStyles();
  const setAuthorizationHeader = token => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
  };
  const [setSemiAuthenticated] = useContext(ContextAuth);
  useEffect(() => {
    const getHome = () => {
      axios
        .get("/checking")
        .then(res => {
          setAuthorizationHeader(res.data.token);
          setSemiAuthenticated({ semiAuthenticated: true });
        })
        .catch(() => {});
    };
    getHome();
  });
  return (
    <div className={classes.circular}>
      <CircularProgress />
    </div>
  );
};

export default Checking;
*/
