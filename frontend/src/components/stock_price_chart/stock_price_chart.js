import React, { Component } from "react";
import Chart from "chart.js";
import "./stock_price_chart.css";

export class StockPriceChart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var ctx = document.getElementById("myChart");
    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            data: this.props.data,
            fill: false,
            borderColor: "#21ce99",
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHitRadius: 10
          }
        ],
        labels: this.props.labels
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "index",
          intersect: false
        },
        layout: {
          padding: {
            right: 40,
            left: 40,
            top: 10
          }
        },
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
