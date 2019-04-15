import React, { Component } from "react";
import { getTrades, getShares } from "../../util/shares_api_util";
import "./trades.css";

export class Trades extends Component {
  constructor() {
    super();
    this.state = {
      trades: "",
      shares: ""
    };
  }

  componentDidMount() {
    getTrades(this.props.user_id).then(res =>
      this.setState({ trades: res.data })
    );
    getShares(this.props.user_id).then(res =>
      this.setState({ shares: res.data })
    );
  }

  formatDate(dateStr) {
    return new Date(dateStr).toLocaleString("en-GB", { hour12: true });
  }

  formatTrade(trade, idx) {
    return (
      <tr key={idx}>
        <td>{this.formatDate(trade.date)}</td>
        <td>{trade.company}</td>
        <td>{trade.ticker}</td>
        <td>{trade.buy ? "Buy" : "Sell"}</td>
        <td>{trade.amount.toLocaleString()}</td>
        <td>{trade.price.toLocaleString()}</td>
      </tr>
    );
  }

  formatShares(share, idx) {
    if (share.watchlist) return false;

    return (
      <tr key={idx}>
        <td>{share.company}</td>
        <td>{share.ticker}</td>
        <td>{share.owned.toLocaleString()}</td>
      </tr>
    );
  }

  render() {
    if (!this.state.trades || !this.state.shares) return false;

    return (
      <div className="trades-container">
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
        <h2>Trades</h2>
        <table className="trade-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Ticker</th>
              <th>Buy/Sell</th>
              <th>Shares</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.trades.map((trade, idx) =>
              this.formatTrade(trade, idx)
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Trades;
