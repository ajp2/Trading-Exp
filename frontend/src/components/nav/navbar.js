import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export class NavBar extends Component {
  displayLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to="/home">Home</Link>
          <Link to="/trades">Trades</Link>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <header className="navbar">
        <Link to="/" className="brand">
          <img src={require("../../images/logo.png")} alt="" />
          <h1>
            Trading<span className="brand-text">Exp</span>
          </h1>
        </Link>
        {this.displayLinks()}
      </header>
    );
  }
}

export default NavBar;
