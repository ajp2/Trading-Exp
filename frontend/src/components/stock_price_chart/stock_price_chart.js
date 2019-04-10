import React, { Component } from "react";
import Chart from "chart.js";
import "./stock_price_chart.css";

export class StockPriceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myChart: ""
    };

    this.displayChart = this.displayChart.bind(this);
  }

  componentDidMount() {
    this.displayChart(this.props.data, this.props.labels);
  }

  componentWillReceiveProps(nextProps) {
    this.state.myChart.destroy();
    this.setState({ myChart: "" });
    this.displayChart(nextProps.data, nextProps.labels);
  }

  displayChart(data, labels) {
    const ctx = document.getElementById("myChart");
    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            data,
            fill: false,
            borderColor: "#21ce99",
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHitRadius: 10
          }
        ],
        labels
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

    this.setState({ myChart });
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
