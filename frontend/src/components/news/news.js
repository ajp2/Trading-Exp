import React, { Component } from "react";
import "./news.css";
import { getNews } from "../../util/news_api";

export class News extends Component {
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
    if (this.state.news.length === 0) return false;
    console.log(this.state.news);
    return (
      <div className="news-container">
        <p>news</p>
        {this.state.news.map((article, idx) => (
          <div className="news-item" key={idx}>
            <img src={article.urlToImage} alt="News article" />
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default News;
