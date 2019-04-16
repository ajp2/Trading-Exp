import React, { Component } from "react";
import "./portfolio.css";
import Chart from "chart.js";
import News from "../news/news";
import { getQuote, getShares } from "../../util/shares_api_util";

export class Portolio extends Component {
  constructor() {
    super();
    this.state = {
      shares: "",
      fetchedInfo: false
    };

    this.fetchQuotes = this.fetchQuotes.bind(this);
  }

  componentDidMount() {
    getShares(this.props.user_id).then(res =>
      this.setState({ shares: res.data }, this.fetchQuotes)
    );
  }

  fetchQuotes() {
    let quotes = {};
    this.state.shares.forEach(share =>
      getQuote(share.ticker).then(res => {
        quotes[share.ticker] = res.data["Global Quote"]["05. price"];
        if (Object.keys(quotes).length === this.state.shares.length) {
          const updatedShares = this.state.shares.map(oldShare => ({
            ...oldShare,
            price: quotes[oldShare.ticker]
          }));
          this.setState({ shares: updatedShares, fetchedInfo: true }, () =>
            this.createChart(
              this.props.total_cash,
              this.calcTotalMarketValue(this.state.shares)
            )
          );
        }
      })
    );
  }

  formatShares(share, idx) {
    if (share.watchlist) return false;
    const price = Number(share.price).toString();

    return (
      <tr key={idx}>
        <td>{share.company}</td>
        <td>{share.ticker}</td>
        <td>{share.owned}</td>
        <td>{price}</td>
      </tr>
    );
  }

  calcTotalMarketValue(shares) {
    let total = 0;
    shares.forEach(share => (total += share.owned * share.price));
    return total;
  }

  calcTotalReturn(portfolioValue) {
    const initialFunds = 1000000;
    return ((portfolioValue - initialFunds) / initialFunds) * 100;
  }

  createChart(cash, shares) {
    const ctx = document.getElementById("myPieChart");
    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        datasets: [{ data: [cash, shares] }],
        labels: ["Available Funds", "Market Value of Shares"]
      }
    });
  }

  render() {
    if (!this.state.fetchedInfo) return false;

    const total_cash = this.props.total_cash;
    const totalMarketValue = this.calcTotalMarketValue(this.state.shares);
    const portfolioValue = total_cash + totalMarketValue;
    const totalReturn = this.calcTotalReturn(portfolioValue).toLocaleString();

    return (
      <div className="portfolio">
        <h1>Portfolio</h1>
        <div className="portfolio-info-container">
          <div className="portfolio-info">
            <div className="info-top">
              <h3>
                Available Funds:{" "}
                <span className="info-value">
                  {total_cash.toLocaleString()}
                </span>
              </h3>
              <h3>
                Market Value of Shares:{" "}
                <span className="info-value">
                  {totalMarketValue.toLocaleString()}
                </span>
              </h3>
            </div>
            <div className="info-bottom">
              <h3>
                Portfolio Value:{" "}
                <span className="info-value total">
                  {portfolioValue.toLocaleString()}
                </span>
              </h3>
              <h3>
                Total Return:{" "}
                <span className="info-value total">{totalReturn + "%"}</span>
              </h3>
            </div>
          </div>
          <div className="portfolio-chart">
            <canvas id="myPieChart" />
          </div>
        </div>

        <h2>Shares</h2>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Market Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.shares.map((share, idx) =>
              this.formatShares(share, idx)
            )}
          </tbody>
        </table>
        <h2>Recent Trades</h2>

        <News />
      </div>
    );
  }
}

export default Portolio;
