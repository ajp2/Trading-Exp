import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./navbar.css";
import companyList from "./companies_list.json";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: "",
      searchResults: []
    };

    document.addEventListener("click", e => this.toggleSearchResults(e));

    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.toggleSearchResults = this.toggleSearchResults.bind(this);
  }

  componentDidMount() {
    this.hamburgerMenu();
  }

  toggleSearchResults(e) {
    if (this.state.searchResults.length <= 0) return;

    const targetClasses = e.target.classList;
    const searchContainer = document.querySelector(".search-container");
    if (
      targetClasses.contains("search-item") ||
      targetClasses.contains("search-input")
    ) {
      searchContainer.classList.remove("hide-search-container");
    } else {
      searchContainer.classList.add("hide-search-container");
    }
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push("/");
  }

  handleChange(e) {
    this.setState({ searchBar: e.target.value });
    let searchResults = [];
    if (e.target.value.length > 0) {
      searchResults = companyList.filter(company => {
        return (
          this.findMatch(company.symbol, e.target.value) ||
          this.findMatch(company.name, e.target.value)
        );
      });
      searchResults = searchResults.slice(0, 10);
    } else {
      searchResults = [];
    }
    this.setState({ searchResults });
  }

  findMatch(company, search) {
    return company.toLowerCase().startsWith(search.toLowerCase());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ searchBar: "", searchResults: [] });
    this.props.history.push(`/search?query=${encodeURI(this.state.searchBar)}`);
  }

  displayLinks() {
    if (this.props.loggedIn) {
      return (
        <ul className="links">
          <li>
            <Link to="/portfolio">Home</Link>
          </li>
          <li>
            <Link to="/trades">Trades</Link>
          </li>
          <button onClick={this.handleLogout}>Logout</button>
        </ul>
      );
    } else {
      return (
        <ul className="links">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  displaySearchResults() {
    if (this.state.searchResults.length > 0) {
      return (
        <div className="search-container">
          <ul className="search-results">
            {this.state.searchResults.map((company, idx) => (
              <li
                key={idx}
                className="search-item"
                onClick={() =>
                  localStorage.setItem("companyName", company.name)
                }
              >
                <Link
                  to={{
                    pathname: `/stocks/${company.symbol}`,
                    state: { name: company.name }
                  }}
                >
                  {company.symbol} - {company.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }

  hamburgerMenu() {
    const menu = document.querySelector(".hamburger-menu");
    const links = document.querySelector(".links");
    menu.addEventListener("click", () => {
      links.classList.toggle("show-links");
    });

    links.addEventListener("click", () => {
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
                className="search-input"
                value={this.state.searchBar}
                onChange={this.handleChange}
              />
              {this.displaySearchResults()}
            </form>
          ) : (
            false
          )}
        </div>

        <div>
          <div className="hamburger-menu">
            <div />
            <div />
            <div />
          </div>
          {this.displayLinks()}
        </div>
      </header>
    );
  }
}

export default withRouter(NavBar);
