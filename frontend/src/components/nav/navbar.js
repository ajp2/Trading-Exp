import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <header>
        <h1>TradingExp</h1>
        {this.displayLinks()}
      </header>
    );
  }
}

export default NavBar;
