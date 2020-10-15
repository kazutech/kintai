import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import useReactRouter from "use-react-router";

const Navbar = () => {
  const { history } = useReactRouter();
  return (
    <AppBar>
      <Toolbar className="nav-container">
        <Fragment>
          <Button color="inherit" onClick={() => history.push("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => history.push("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => history.push("/signup")}>
            Signup
          </Button>
        </Fragment>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
