import React, { Component } from "react";
import "./portfolio.css";
import News from "../news/news";
import StockPriceChart from "../stock_price_chart/stock_price_chart";
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
          this.setState({ shares: updatedShares, fetchedInfo: true });
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

  render() {
    if (!this.state.fetchedInfo) return false;
    const total_cash = this.props.total_cash;
    const totalMarketValue = this.calcTotalMarketValue(this.state.shares);
    const portfolioValue = total_cash + totalMarketValue;
    const totalReturn = this.calcTotalReturn(portfolioValue).toLocaleString();

    return (
      <div className="portfolio">
        <h1>Portfolio</h1>
        <h3>Available Funds: {total_cash.toLocaleString()}</h3>
        <h3>
          Total Market Value in Shares: {totalMarketValue.toLocaleString()}
        </h3>
        <h3>Portfolio Value: {portfolioValue.toLocaleString()}</h3>
        <h3>Total Return: {totalReturn + "%"}</h3>

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
