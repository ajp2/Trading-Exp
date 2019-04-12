import React, { Component } from "react";
import "./transaction.css";

export class Transaction extends Component {
  constructor(props) {
    super(props);

    // activeButton: true - buy, false - sell
    this.state = {
      activeButton: true
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(e) {
    if (e.target.classList.contains("buy") && !this.state.activeButton) {
      e.target.classList.add("button-green");
      document.querySelector(".sell").classList.remove("button-red");
      this.setState({ activeButton: true });
    } else if (e.target.classList.contains("sell") && this.state.activeButton) {
      e.target.classList.add("button-red");
      document.querySelector(".buy").classList.remove("button-green");
      this.setState({ activeButton: false });
    }
  }

  render() {
    return (
      <div className="transaction">
        <div className="transaction-buttons" onClick={this.handleButtonClick}>
          <button className="buy button-green">Buy</button>
          <button className="sell">Sell</button>
        </div>

        <div className="transaction-info">
          <p>
            Owned: <span className="value">0</span>
          </p>
          <label>
            Shares
            <input type="number" placeholder="0" />
          </label>
          <p>
            Market Price <span className="value">{this.props.latestPrice}</span>
          </p>
          <p>
            {this.state.activeButton ? "Cost" : "Proceeds"}
            <span className="value">100</span>
          </p>
          <p>
            Available Funds <span className="value">1,000,000</span>
          </p>
        </div>

        {this.state.activeButton ? (
          <button className="submit buy-button">Buy</button>
        ) : (
          <button className="submit sell-button">Sell</button>
        )}

        {/* Check if in watchlist */}
        <button className="watchlist">Add to Watchlist</button>
      </div>
    );
  }
}

export default Transaction;
