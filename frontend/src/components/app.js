import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import "./app.css";

import MainPageContainer from "./main/main_page_container";
import NavBarContainer from "./nav/navbar_container";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import PortfolioContainer from "./portfolio/portfolio_container";
import SearchContainer from "./search/search_container";
import CompanyContainer from "../components/company/company_container";
import TradesContainer from "../components/trades/trades_container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarContainer />
        <Switch>
          <Route exact path="/" component={MainPageContainer} />
          <AuthRoute expact path="/signup" component={SignupFormContainer} />
          <AuthRoute expact path="/login" component={LoginFormContainer} />
          <ProtectedRoute
            exact
            path="/portfolio"
            component={PortfolioContainer}
          />
          <ProtectedRoute exact path="/search" component={SearchContainer} />
          <ProtectedRoute exact path="/trades" component={TradesContainer} />
          <ProtectedRoute
            exact
            path="/stocks/:ticker"
            component={CompanyContainer}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
