/*
import React, { Component, useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import login from "../../pages/login";
import signup from "../../pages/signup";
import checking from "../../pages/checking";
import home from "../../pages/home";
import introduction from "../../pages/introduction";
import jwtDecode from "jwt-decode";
import axios from "axios";
import AuthRoute from "../../util/AuthRoute";

export const ContextAuth = createContext([null, () => {}]);

const HooksWarp = ({ HooksProps }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [semiAuthenticated, setSemiAuthenticated] = useState(false);
  return HooksProps({
    authenticated,
    setAuthenticated,
    semiAuthenticated,
    setSemiAuthenticated
  });
};

export default class Mainbody extends Component {
  render() {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
      } else {
        if (semiAuthenticated === false) {
          if (authenticated === false) {
            setAuthenticated({ authenticated: true });
            axios.defaults.headers.common["Authorization"] = token;
          } else {
            setSemiAuthenticated({ semiAuthenticated: true });
            axios.defaults.headers.common["Authorization"] = token;
          }
        }
      }
    }
    return (
      <HooksWarp>
        {({
          authenticated,
          setAuthenticated,
          semiAuthenticated,
          setSemiAuthenticated
        }) => {
          <div>
            <Switch>
              <Route exact path="/checking" component={checking} />
              <Route exact path="/" component={home} />
              <ContextAuth.Provider
                value={[authenticated, semiAuthenticated, setAuthenticated]}
              >
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
              </ContextAuth.Provider>
              <Route exact path="/introduction" component={introduction} />
            </Switch>
          </div>;
        }}
      </HooksWarp>
    );
  }
}
*/
