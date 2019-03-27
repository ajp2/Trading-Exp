import React, { Component } from "react";
import MainPageContainer from "./main/main_page_container";
import NavBarContainer from "./nav/navbar_container";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import { Route, Switch } from "react-router-dom";
import "./app.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarContainer />
        <Switch>
          <Route exact path="/" component={MainPageContainer} />} />
          <Route expact path="/signup" component={SignupFormContainer} />
          <Route expact path="/login" component={LoginFormContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
