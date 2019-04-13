import React, { Component } from "react";
import "./transaction.css";
import { getOwnedShares } from "../../util/shares_api_util";

export class Transaction extends Component {
  constructor(props) {
    super(props);

    // activeButton: true - buy, false - sell
    this.state = {
      activeButton: true,
      shares: "",
      totalValue: 0,
      errors: "",
      ownedShares: ""
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
    this.fetchOwnedShares = this.fetchOwnedShares.bind(this);
  }

  componentDidMount() {
    this.fetchOwnedShares();
  }

  fetchOwnedShares() {
    getOwnedShares(this.props.user_id, this.props.ticker).then(res =>
      console.log(res.data)
    );
  }

  handleButtonClick(e) {
    this.setState({ shares: "", totalValue: 0, errors: "" }, this.checkErrors);

    // Button styling
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

  handleChange(e) {
    this.setState(
      {
        shares: e.target.value,
        totalValue: this.props.latestPrice * e.target.value
      },
      this.checkErrors
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    // get owned shares and add/subtract this.state.shares to that value
    // if error caused by insufficient funds/shares, send error message
  }

  checkErrors() {
    // TODO: set owned shares;
    let errors;
    if (
      this.state.activeButton &&
      this.state.totalValue > this.props.total_cash
    ) {
      errors = "Insufficient funds";
    } else if (!this.state.activeButton && this.state.shares > 0) {
      errors = "You do not own that many shares";
    } else {
      errors = "";
      document.querySelector(".submit").disabled = false;
    }

    if (errors) document.querySelector(".submit").disabled = true;
    this.setState({ errors });
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
            <input
              type="number"
              placeholder="0"
              value={this.state.shares}
              onChange={this.handleChange}
            />
          </label>
          <p>
            Market Price <span className="value">{this.props.latestPrice}</span>
          </p>
          <p>
            {this.state.activeButton ? "Total Cost" : "Total Proceeds"}
            <span className="value">
              {this.state.totalValue.toLocaleString()}
            </span>
          </p>
          <p>
            Available Funds{" "}
            <span className="value">
              {this.props.total_cash.toLocaleString()}
            </span>
          </p>
        </div>

        {this.state.errors ? <p>{this.state.errors}</p> : false}

        <button
          className={`submit ${
            this.state.activeButton ? "buy-button" : "sell-button"
          }`}
          onSubmit={this.handleSubmit}
        >
          {this.state.activeButton ? "Buy" : "Sell"}
        </button>

        {/* Check if in watchlist */}
        <button className="watchlist">Add to Watchlist</button>
      </div>
    );
  }
}

export default Transaction;
