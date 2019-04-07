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
            data: [10, 20, 5, 40, 120, 60, 20],
            fill: false,
            borderColor: "#21ce99",
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHitRadius: 150
          }
        ],
        labels: ["January", "February", "March", "April", "May", "June", "July"]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
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
