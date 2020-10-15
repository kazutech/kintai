import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ContextAuth } from "../App";

export const PrivateRoute = ({ children, ...rest }) => {
  const [authenticated] = useContext(ContextAuth);
  console.log(authenticated);
  return (
    <Route
      {...rest}
      render={() => (authenticated === true ? children : null)}
    />
  );
};

export const PublicRoute = ({ children, ...rest }) => {
  const [authenticated] = useContext(ContextAuth);
  return (
    <Route
      {...rest}
      render={() =>
        authenticated === true ? <Redirect to={{ pathname: "/" }} /> : children
      }
    />
  );
};

/*
export const CheckRoute = ({ children, ...rest }) => {
  const [semiAuthenticated] = useContext(ContextAuth);
  const [authenticated] = useContext(ContextAuth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated === true ? (
          semiAuthenticated === true ? (
            <Redirect to={{ pathname: "/home", state: { from: location } }} />
          ) : (
            children
          )
        ) : null
      }
    />
  );
};
*/
