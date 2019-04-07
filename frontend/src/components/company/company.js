import React, { Component } from "react";
import News from "../news/news";
import { getTimesSeries } from "../../util/shares_api_util";
import StockPriceChart from "../stock_price_chart/stock_price_chart";

export class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: "",
      timeFormat: "intraday",
      fetchedInfo: false
    };

    this.fetchTimeSeries = this.fetchTimeSeries.bind(this);
    this.getCompanyPrices = this.getCompanyPrices.bind(this);
    this.getCompanyLabels = this.getCompanyLabels.bind(this);
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
      }
    });
  }

  getCompanyPrices() {
    const companyInfo = this.state.companyInfo["Time Series (5min)"];
    const times = Object.keys(companyInfo)
      .sort()
      .slice(22);
    const formattedTimes = times.map(time => time.split(" ")[1]);
    formattedTimes.unshift("09:00:00");
    const prices = times.map(time => companyInfo[time]);
    const formattedPrices = prices.map(item => item["4. close"]);
    formattedPrices.unshift(prices[0]["1. open"]);

    return [formattedTimes, formattedPrices];
  }

  getCompanyLabels() {}

  render() {
    if (!this.state.fetchedInfo) return false;
    const [labels, data] = this.getCompanyPrices();

    return (
      <div className="company">
        <h2>Company page</h2>
        <p>{localStorage.getItem("companyName")}</p>
        <p>
          {
            this.state.companyInfo["Time Series (5min)"][
              Object.keys(this.state.companyInfo["Time Series (5min)"])[0]
            ]["4. close"]
          }
        </p>
        <StockPriceChart data={data} labels={labels} />
        <News />
      </div>
    );
  }
}

export default Company;
