import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main_page.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.guestLogin = this.guestLogin.bind(this);
  }

  guestLogin(e) {
    const user = {
      username: "guest"
    };
    this.props.login(user).then(() => this.props.history.push("./portfolio"));
  }

  render() {
    return (
      <div className="background-container">
        <div className="main">
          <div className="image">
            <img src={require("../../images/front-page-image.jpg")} alt="" />
          </div>

          <div className="main-text">
            <h2>Test your investing skills.</h2>
            <p>
              Sick of losing money in the market? Start practicing for free
              today.
            </p>
            {this.props.loggedIn ? (
              <Link to="/portfolio">Back To Portfolio</Link>
            ) : (
              <button onClick={this.guestLogin}>Login as a Guest</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
