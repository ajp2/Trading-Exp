import React, { Component } from "react";
import "./portfolio.css";
import News from "../news/news";
import StockPriceChart from "../stock_price_chart/stock_price_chart";
import { getQuote, getShares } from "../../util/shares_api_util";

export class Portolio extends Component {
  constructor() {
    super();
    this.state = {
      shares: ""
    };

    this.fetchQuotes = this.fetchQuotes.bind(this);
  }

  componentDidMount() {
    getShares(this.props.user_id).then(res =>
      this.setState({ shares: res.data }, this.fetchQuotes)
    );
  }

  fetchQuotes() {
    // let quotes = {};
    // this.state.shares.forEach(share =>
    //   getQuote(share.ticker).then(res =>
    //     console.log(res.data["Global Quote"]["05. price"])
    //   )
    // );
  }

  formatShares(share, idx) {
    if (share.watchlist) return false;

    return (
      <tr key={idx}>
        <td>{share.company}</td>
        <td>{share.ticker}</td>
        <td>{share.owned}</td>
      </tr>
    );
  }

  render() {
    if (!this.state.shares) return false;
    const total_cash = this.props.total_cash;

    const data = [10, 20, 5, 40, 120, 60, 20];
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July"
    ];

    return (
      <div className="portfolio">
        <h1>Portfolio</h1>
        <h3>Available Funds: {total_cash.toLocaleString()}</h3>
        <StockPriceChart data={data} labels={labels} />

        <h2>Shares</h2>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Ticker</th>
              <th>Shares</th>
            </tr>
          </thead>
          <tbody>
            {this.state.shares.map((share, idx) =>
              this.formatShares(share, idx)
            )}
          </tbody>
        </table>

        <News />
      </div>
    );
  }
}

export default Portolio;
