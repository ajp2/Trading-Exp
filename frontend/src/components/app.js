import React, { Component } from "react";
import MainPage from "./main/main_page";
import NavBarContainer from "./nav/navbar_container";
import SignupFormContainer from "./session/signup_form_container";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarContainer />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route expact path="/signup" component={SignupFormContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
