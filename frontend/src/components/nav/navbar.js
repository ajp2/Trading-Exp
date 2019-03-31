import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./navbar.css";
import { searchShares } from "../../util/shares_api_util";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: ""
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.hamburgerMenu();
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push("/");
  }

  handleChange(e) {
    this.setState({ searchBar: e.target.value });
    searchShares(e.target.value).then(res => console.log(res.data.bestMatches));
  }

  displayLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="links">
          <Link to="/portfolio">Home</Link>
          <Link to="/trades">Trades</Link>
          <button onClick={this.handleLogout}>Logout</button>
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

  hamburgerMenu() {
    const menu = document.querySelector(".hamburger-menu");
    menu.addEventListener("click", () => {
      const links = document.querySelector(".links");
      links.classList.toggle("show-links");
    });
  }

  render() {
    return (
      <header className="navbar">
        <div className="menu-left">
          <Link to={this.props.loggedIn ? "/portfolio" : "/"} className="brand">
            <img src={require("../../images/logo.png")} alt="" />
            <h1>
              Trading<span className="brand-text">Exp</span>
            </h1>
          </Link>
          {this.props.loggedIn ? (
            <input
              type="text"
              placeholder="search"
              onChange={this.handleChange}
            />
          ) : (
            false
          )}
        </div>
        {this.displayLinks()}
        <div className="hamburger-menu">
          <div />
          <div />
          <div />
        </div>
      </header>
    );
  }
}

export default withRouter(NavBar);
