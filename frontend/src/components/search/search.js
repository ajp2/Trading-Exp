import React, { Component } from "react";

export class Search extends Component {
  componentWillUnmount() {
    this.props.clearSearchResults();
  }

  render() {
    console.log(this.props.searchResults[0]);
    return (
      <div>
        <h1>Search results</h1>
        <ul>
          {this.props.searchResults.map((company, idx) => (
            <li key={idx}>
              {company["1. symbol"]} - {company["2. name"]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Search;
