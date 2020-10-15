/*

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ContextAuth } from "../App";

const PublicRoute = ({ children, ...rest }) => {
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

export default PublicRoute;

*/
