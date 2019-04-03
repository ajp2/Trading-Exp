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
    console.log(this.state.news);
    return (
      <div className="news-container">
        {this.state.news.map((article, idx) => (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-item"
            key={idx}
          >
            <img src={article.urlToImage} alt="News article" />
            <div className="news-content">
              <h3>{article.title.split(" - ")[0]}</h3>
              <p>{article.description}</p>
            </div>
          </a>
        ))}
      </div>
    );
  }
}

export default News;
