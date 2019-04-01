import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./navbar.css";
import { searchShares } from "../../util/shares_api_util";
import companyList from "./companies_list.json";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: "",
      searchResults: []
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    let results = [];
    if (e.target.value.length > 0) {
      results = companyList.filter(company => {
        return (
          this.findMatch(company.symbol, e.target.value) ||
          this.findMatch(company.name, e.target.value)
        );
      });
      results = results.slice(0, 10);
      this.setState({ results }, () => console.log(this.state.results));
    }
  }

  findMatch(company, search) {
    return company.toLowerCase().startsWith(search.toLowerCase());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ searchBar: "" });
    this.props.history.push("/search");
    searchShares(this.state.searchBar).then(res =>
      console.log(res.data.bestMatches)
    );
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
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="search"
                value={this.state.searchBar}
                onChange={this.handleChange}
              />
            </form>
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
