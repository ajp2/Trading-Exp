import React, { Component } from "react";
import "./portfolio.css";
import News from "../news/news";
import StockPriceChart from "../stock_price_chart/stock_price_chart";

export class Portolio extends Component {
  render() {
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
        <h1>portfolio</h1>
        <StockPriceChart data={data} labels={labels} />
        <News />
      </div>
    );
  }
}

export default Portolio;
