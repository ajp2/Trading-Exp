import React, { Component } from "react";
import News from "../news/news";
import { getTimesSeries } from "../../util/shares_api_util";

export class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: "",
      timeFormat: "intraday",
      fetchedInfo: false
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
      // Error can only occur by following link from dropdown.
      // So state.name will always exist if error occurs
      if (res.data["Error Message"]) {
        this.props.history.push({
          pathname: "/search",
          search: `?query=${query}`,
          state: {
            error: query,
            name: this.props.location.state.name
          }
        });
      } else {
        this.setState({ companyInfo: res.data, fetchedInfo: true });
        console.log(this.state.companyInfo);
      }
    });
  }

  render() {
    console.log(this.props);
    if (!this.state.fetchedInfo) return false;
    return (
      <div className="company">
        <h2>Company page</h2>
        <p>
          {
            this.state.companyInfo["Time Series (5min)"][
              Object.keys(this.state.companyInfo["Time Series (5min)"])[0]
            ]["4. close"]
          }
        </p>
        <News />
      </div>
    );
  }
}

export default Company;
