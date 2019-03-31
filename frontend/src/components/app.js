import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import "./app.css";

import MainPageContainer from "./main/main_page_container";
import NavBarContainer from "./nav/navbar_container";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarContainer />
        <Switch>
          <AuthRoute exact path="/" component={MainPageContainer} />} />
          <AuthRoute expact path="/signup" component={SignupFormContainer} />
          <AuthRoute expact path="/login" component={LoginFormContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
