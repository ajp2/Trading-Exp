import React, { Component } from "react";
import "./transaction.css";
import {
  getOwnedShares,
  updateShareInfo,
  createTrade
} from "../../util/shares_api_util";

export class Transaction extends Component {
  constructor(props) {
    super(props);

    // activeButton: true - buy, false - sell
    this.state = {
      activeButton: true,
      shares: "",
      totalValue: 0,
      errors: "",
      ownedShares: "",
      watchlist: false,
      loaded: false
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWatchlistSubmit = this.handleWatchlistSubmit.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
    this.fetchOwnedShares = this.fetchOwnedShares.bind(this);
    this.submitShareInfo = this.submitShareInfo.bind(this);
  }

  componentDidMount() {
    this.ticker = this.props.ticker;
    this.fetchOwnedShares().then(() => this.setState({ loaded: true }));
  }

  componentDidUpdate() {
    if (this.ticker !== this.props.ticker) {
      this.ticker = this.props.ticker;
      this.setState({ loaded: false });
      this.fetchOwnedShares().then(() => this.setState({ loaded: true }));
    }
  }

  fetchOwnedShares() {
    return getOwnedShares(this.props.user_id, this.props.ticker).then(res =>
      this.setState({
        ownedShares: res.data.ownedShares,
        watchlist: res.data.watchlist
      })
    );
  }

  submitShareInfo(infoObj) {
    return updateShareInfo(this.props.user_id, this.props.ticker, infoObj);
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
    if (!this.state.shares || Number(this.state.shares) <= 0) return;

    let updatedShares;
    if (this.state.activeButton) {
      updatedShares = this.state.ownedShares + Number(this.state.shares);
    } else {
      updatedShares = this.state.ownedShares - Number(this.state.shares);
    }

    const info = {
      shares: updatedShares
    };
    const trade = {
      user_id: this.props.user_id,
      ticker: this.props.ticker,
      company: this.props.companyName,
      buy: this.state.activeButton,
      amount: Number(this.state.shares),
      price: this.props.latestPrice
    };

    this.submitShareInfo(info).then(() => {
      createTrade(trade).then(res => {
        console.log(res.data);
        this.props.updateTotalCash(res.data.total_cash);
        this.setState({ shares: "" });
        this.fetchOwnedShares();
      });
    });
  }

  handleWatchlistSubmit(e) {
    const info = {
      watchlist: true
    };

    this.submitShareInfo(info).then(() => {
      this.fetchOwnedShares();
    });
  }

  checkErrors() {
    let errors;
    // Check if purchase is greater than available cash
    if (
      this.state.activeButton &&
      this.state.totalValue > this.props.total_cash
    ) {
      errors = "Insufficient funds";
      // Check if selling too many shares
    } else if (
      !this.state.activeButton &&
      this.state.shares > this.state.ownedShares
    ) {
      errors = "You do not own that many shares";
    } else {
      errors = "";
      document.querySelector(".submit").disabled = false;
    }

    if (errors) document.querySelector(".submit").disabled = true;
    this.setState({ errors });
  }

  render() {
    if (!this.state.loaded) return false;

    return (
      <div className="transaction">
        <div className="transaction-buttons" onClick={this.handleButtonClick}>
          <button className="buy button-green">Buy</button>
          <button className="sell">Sell</button>
        </div>

        <form className="transaction-info" onSubmit={this.handleSubmit}>
          <p>
            Owned: <span className="value">{this.state.ownedShares}</span>
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

          {this.state.errors ? (
            <p className="transaction-errors">{this.state.errors}</p>
          ) : (
            false
          )}

          <button
            className={`submit ${
              this.state.activeButton ? "buy-button" : "sell-button"
            }`}
          >
            {this.state.activeButton ? "Buy" : "Sell"}
          </button>
        </form>

        {/* Show button only if not in watchlist and no owned shares */}
        {!this.state.watchlist && !this.state.ownedShares ? (
          <button className="watchlist" onClick={this.handleWatchlistSubmit}>
            Add to Watchlist
          </button>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default Transaction;
