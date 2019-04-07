import React, { Component } from "react";
import "./portfolio.css";
import News from "../news/news";
import StockPriceChart from "../stock_price_chart/stock_price_chart";

export class Portolio extends Component {
  render() {
    return (
      <div className="portfolio">
        <h1>portfolio</h1>
        <StockPriceChart />
        <News />
      </div>
    );
  }
}

export default Portolio;
