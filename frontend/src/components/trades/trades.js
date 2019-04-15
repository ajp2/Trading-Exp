import React, { Component } from "react";
import { getTrades } from "../../util/shares_api_util";
import "./trades.css";

export class Trades extends Component {
  constructor() {
    super();
    this.state = {
      trades: ""
    };
  }

  componentDidMount() {
    getTrades(this.props.user_id).then(res =>
      this.setState({ trades: res.data })
    );
  }

  formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }

  formatTradeString(trade, idx) {
    return (
      <tr key={idx}>
        <td>{this.formatDate(trade.date)}</td>
        <td>{trade.company}</td>
        <td>{trade.ticker}</td>
        <td>{trade.buy ? "Buy" : "Sell"}</td>
        <td>{trade.amount}</td>
        <td>{trade.price}</td>
      </tr>
    );
  }

  render() {
    if (!this.state.trades) return false;
    console.log(this.state.trades);

    return (
      <div className="trades-container">
        <h2>Trades</h2>
        <table>
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
              this.formatTradeString(trade, idx)
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Trades;
