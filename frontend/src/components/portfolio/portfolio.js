import React, { Component } from "react";
import "./portfolio.css";
import News from "../news/news";

export class Portolio extends Component {
  render() {
    console.log(this.state);
    return (
      <div className="portfolio">
        <h1>portfolio</h1>
        <News />
      </div>
    );
  }
}

export default Portolio;
