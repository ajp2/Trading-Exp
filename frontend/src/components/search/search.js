import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./search.css";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.getQueryString = this.getQueryString.bind(this);
  }

  componentDidMount() {
    this.queryString = this.getQueryString();
    this.props.search(this.queryString);
  }

  componentWillUnmount() {
    this.props.clearSearchResults();
  }

  componentDidUpdate() {
    if (this.queryString !== this.getQueryString()) {
      this.queryString = this.getQueryString();
      this.props.search(this.getQueryString());
    }
  }

  getQueryString() {
    return decodeURI(this.props.location.search.split("=")[1]);
  }

  render() {
    let tickerNotFound = false;
    if (this.props.location.state && this.props.location.state.error) {
      const invalidTicker = this.props.location.state.error;
      const companyName = this.props.location.state.name;
      tickerNotFound = `${invalidTicker} is an invalid ticker. Instead showing results for ${companyName}`;
    }

    return (
      <div className="search-results-container">
        <h2>
          {tickerNotFound
            ? tickerNotFound
            : "Showing results for: " + this.getQueryString()}
        </h2>
        <ul className="search-results-list">
          {this.props.searchResults.map((company, idx) => (
            <li key={idx}>
              <Link
                to={{
                  pathname: `/stocks/${company["1. symbol"]}`,
                  state: { name: company["2. name"] }
                }}
              >
                {company["2. name"]}
                <span className="region">Country: {company["4. region"]}</span>
                <span className="ticker">{company["1. symbol"]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Search;
