import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import { PublicRoute, PrivateRoute } from "./util/AuthRoute";

//pages
import Navbar from "./components/layout/Navbar";
import home from "./pages/home";
import introduction from "./pages/introduction";
import BottomNavbar from "./components/layout/BottomNavbar";
import axios from "axios";
import checking from "./pages/checking";
import Login from "./pages/login";
import Signup from "./pages/signup";

export const ContextAuth = createContext([null, () => {}]);

axios.defaults.baseURL =
  "http://localhost:5000/kintai-server/asia-northeast1/api";
/*
  "https://asia-northeast1-kintai-server.cloudfunctions.net/api";
*/
const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.FBCTIdToken;

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("FBCTIdToken");
      delete axios.defaults.headers.common["Authorization"];
      setAuthenticated(false);
      window.location.href = "/login";
    } else {
      axios.defaults.headers.common["Authorization"] = token;
      !authenticated && setAuthenticated(true);
    }
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <ContextAuth.Provider value={[authenticated, setAuthenticated]}>
              <PrivateRoute>
                <Route exact path="/" component={home} />
              </PrivateRoute>
              <PublicRoute>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
              </PublicRoute>
            </ContextAuth.Provider>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
