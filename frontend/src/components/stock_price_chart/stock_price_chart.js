import React, { Component } from "react";
import Chart from "chart.js";
import "./stock_price_chart.css";

export class StockPriceChart extends Component {
  componentDidMount() {
    var ctx = document.getElementById("myChart");
    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            data: [10, 20, 30, 40, 50, 60]
          }
        ],
        labels: ["January", "February", "March", "April", "May", "June"]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  render() {
    return (
      <div className="chart-container">
        <canvas id="myChart" />
      </div>
    );
  }
}

export default StockPriceChart;
