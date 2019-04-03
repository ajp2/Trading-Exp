import React, { Component } from "react";
import { getNews } from "../../util/news_api";

export class Portolio extends Component {
  constructor() {
    super();
    this.state = {
      news: []
    };
  }
  componentDidMount() {
    getNews().then(res => this.setState({ news: res.data.articles }));
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>portfolio</h1>
      </div>
    );
  }
}

export default Portolio;
