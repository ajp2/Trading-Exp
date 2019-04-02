import React, { Component } from "react";
import { getTimesSeries } from "../../util/shares_api_util";

export class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeFormat: "intraday"
    };

    this.fetchTimeSeries = this.fetchTimeSeries.bind(this);
  }

  componentDidMount() {
    const query = this.props.match.params.ticker;
    this.ticker = query;
    this.fetchTimeSeries(this.ticker, "intraday");
  }

  componentDidUpdate() {
    const newTicker = this.props.match.params.ticker;
    if (newTicker !== this.ticker) {
      this.ticker = newTicker;
      this.fetchTimeSeries(this.ticker, "intraday");
    }
  }

  fetchTimeSeries(query, timeFormat) {
    getTimesSeries(query, timeFormat).then(res => {
      if (res.data["Error Message"]) {
        this.props.history.push({
          pathname: "/search",
          search: `?query=${query}`,
          state: { error: query }
        });
      } else {
        console.log(res.data);
      }
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Company page</h2>
      </div>
    );
  }
}

export default Company;
