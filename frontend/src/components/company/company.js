import React, { Component } from "react";
import { getTimesSeries } from "../../util/shares_api_util";

export class Company extends Component {
  componentDidMount() {
    getTimesSeries("AAPL", "intraday").then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h2>Company page</h2>
      </div>
    );
  }
}

export default Company;
