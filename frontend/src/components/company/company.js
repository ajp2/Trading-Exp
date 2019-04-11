import React, { Component } from "react";
import "./company.css";
import News from "../news/news";
import {
  getTimesSeries,
  fetchCompanyDescription
} from "../../util/shares_api_util";
import StockPriceChart from "../stock_price_chart/stock_price_chart";
import * as formatPrices from "../../util/format_prices";
import Transaction from "../transaction/transaction";

export class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: {},
      latestPrice: "",
      timeFormat: "intraday",
      fetchedInfo: false,
      description: "",
      labels: [],
      data: []
    };

    this.fetchTimeSeries = this.fetchTimeSeries.bind(this);
    this.getCompanyPrices = this.getCompanyPrices.bind(this);
    this.getCompanyDescription = this.getCompanyDescription.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.apiData = {
      intraday: "Time Series (5min)",
      daily: "Time Series (Daily)",
      monthly: "Monthly Time Series"
    };
  }

  componentDidMount() {
    const query = this.props.match.params.ticker;
    this.ticker = query;
    this.companyName = localStorage.getItem("companyName");
    this.getCompanyDescription();
    Object.keys(this.apiData).forEach(timeFormat => {
      this.fetchTimeSeries(this.ticker, timeFormat);
    });
  }

  componentDidUpdate() {
    const newTicker = this.props.match.params.ticker;
    if (newTicker !== this.ticker) {
      this.ticker = newTicker;
      this.companyName = localStorage.getItem("companyName");
      this.getCompanyDescription();
      Object.keys(this.apiData).forEach(timeFormat => {
        this.fetchTimeSeries(this.ticker, timeFormat);
      });

      // Reset chart button styling
      document
        .querySelectorAll(".chart-button-container button")
        .forEach(el => {
          el.classList.remove("button-selected");
        });
      document
        .querySelector(".chart-button-container button")
        .classList.add("button-selected");
    }
  }

  fetchTimeSeries(query, timeFormat) {
    return getTimesSeries(query, timeFormat).then(res => {
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
        this.setState(prevState => ({
          companyInfo: {
            ...prevState.companyInfo,
            [timeFormat]: formatPrices.objectToArray(
              res.data[this.apiData[timeFormat]]
            )
          }
        }));
        if (timeFormat === "intraday") {
          const lastItem = this.state.companyInfo["intraday"][1].length - 1;
          const latestPrice = this.state.companyInfo["intraday"][1][lastItem][
            "4. close"
          ];
          const [labels, data] = this.getCompanyPrices();
          this.setState({
            latestPrice,
            fetchedInfo: true,
            labels,
            data
          });
        }
      }
    });
  }

  getCompanyPrices() {
    const timeFormat = this.state.timeFormat;
    if (timeFormat === "intraday") {
      return formatPrices.formatIntradayPrices(
        this.state.companyInfo[timeFormat]
      );
    } else if (timeFormat === "daily") {
      return formatPrices.formatDailyPrices(this.state.companyInfo[timeFormat]);
    } else if (timeFormat === "monthly") {
      return formatPrices.formatMonthlyPrices(
        this.state.companyInfo[timeFormat]
      );
    }
  }

  getCompanyDescription() {
    fetchCompanyDescription(this.companyName).then(res => {
      if (res.data.success) {
        console.log(res.data.other);
        this.setState({ description: res.data.description });
      } else {
        this.setState({ description: "" });
      }
    });
  }

  handleButtonClick(e) {
    // Only if button is clicked (not div)
    if (!e.target.classList.contains("chart-button-container")) {
      document
        .querySelectorAll(".chart-button-container button")
        .forEach(el => {
          el.classList.remove("button-selected");
        });
      e.target.classList.add("button-selected");

      // Fetch relevant data
      const buttonTxt = e.target.innerText;
      switch (buttonTxt) {
        case "1 Day":
          this.setState({ timeFormat: "intraday" }, () => {
            const [labels, data] = this.getCompanyPrices();
            this.setState({ labels, data });
          });
          break;
        case "1 Month":
          this.setState({ timeFormat: "daily" }, () => {
            const [labels, data] = this.getCompanyPrices();
            this.setState({ labels, data });
          });
          break;
        default:
          // Differentiate between 1, 5, and 10 years
          const years = Number(buttonTxt.split(" ")[0]);
          this.setState({ timeFormat: "monthly" }, () => {
            const [labels, data] = this.getCompanyPrices();
            const [
              formattedLabels,
              formattedPrices
            ] = formatPrices.displayYearlyPrices(labels, data, years);
            this.setState({ labels: formattedLabels, data: formattedPrices });
          });
          break;
      }
    }
  }

  render() {
    if (!this.state.fetchedInfo) return false;

    return (
      <div className="company">
        <div className="company-info">
          <h3>
            {this.companyName}
            <span className="ticker-heading"> ({this.ticker})</span>
          </h3>
          <h3>{Number(this.state.latestPrice).toLocaleString()}</h3>
        </div>

        <StockPriceChart data={this.state.data} labels={this.state.labels} />

        <div
          className="chart-button-container"
          onClick={this.handleButtonClick}
        >
          <button className="button-selected">1 Day</button>
          <button>1 Month</button>
          <button>1 Year</button>
          <button>5 Years</button>
          <button>10 Years</button>
        </div>

        <div className="mid-container">
          {this.state.description ? (
            <div className="description">
              <h2>About: </h2>
              <p>{this.state.description}</p>
            </div>
          ) : (
            false
          )}
          <Transaction />
        </div>
        <News />
      </div>
    );
  }
}

export default Company;
