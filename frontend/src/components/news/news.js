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
    getNews().then(res =>
      this.setState({ news: res.data.articles.slice(0, 15) })
    );
  }

  render() {
    if (this.state.news.length === 0) return false;
    return (
      <div className="news-container">
        <h2>Latest News</h2>
        {this.state.news.map((article, idx) => (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-item"
            key={idx}
          >
            <div className="article-image">
              <img src={article.urlToImage} alt="News article" />
            </div>
            <div className="news-content">
              <h3>{article.title.split(" - ")[0]}</h3>
              <p>{article.description}</p>
            </div>
          </a>
        ))}
        <a href="https://newsapi.org/" className="footnote">
          Powered by News API
        </a>
      </div>
    );
  }
}

export default News;
