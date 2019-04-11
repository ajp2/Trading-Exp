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
    console.log(this.state);
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
      </div>
    );
  }
}

export default Transaction;
