# Trading Exp

[TradingExp](https://hidden-spire-64857.herokuapp.com/) is an application that allows users to practice investing in the stock market using hypothetical money. Some parts of the UI is based on Robinhood.

![Home page](/docs/screenshots/homepage.png)

## Features

### Pull price data from external API

The AlphaVantage API is used to obtain up to date prices of the requested company. The AJAX request is proxied through the backend to keep the API key private.

```
router.get("/quote/:ticker", (req, res) => {
  const ticker = req.params.ticker;
  axios.get(
      ` https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${alphaVantageAPI}`
    )
    .then(result => res.json(result.data));
});
```

The same API is also used to obtain time series data, within the specified interval.

```
export const getTimesSeries = (ticker, timeFormat) => {
  let apiTimeFormat;
  if (["intraday", "daily", "monthly"].includes(timeFormat)) {
    apiTimeFormat = `TIME_SERIES_${timeFormat.toUpperCase()}`;
  } else {
    apiTimeFormat = `TIME_SERIES_INTRADAY`;
  }
  return axios.get("/api/shares/timeseries", {
    params: {
      ticker,
      apiTimeFormat
    }
  });
};
```

### Display prices using Chart.Js

![Company page](/docs/screenshots/company-page.png)

The time series data is then altered into a useable format, and Chart.js is used to render a line chart of the company's prices over time.

```
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
      ... // see code for more details
    }
  });

  this.setState({ myChart });
}
```

### Ability to buy/sell shares and add to watchlist

Every company available from the AlphaVantage API can be bought/sold or added to a watchlist. Every time a transaction is made, a Trade is also created and saved to the database.

```
this.submitShareInfo(info).then(() => {
  createTrade(trade).then(res => {
    this.props.updateTotalCash(res.data.total_cash);
    this.setState({ shares: "" });
    this.fetchOwnedShares();
  });
});
```

```
export const updateShareInfo = (user_id, ticker, infoObj) =>
  axios.post(`/api/shares/${ticker}`, { info: infoObj, ticker, user_id });
```

### Web scraping using Cheerio

The description of the company is obtained through web scraping a google search of the company name. Axios is used for the AJAX request, and Cheerio is used to obtain the relevant information from the returned HTML.

```
function findInfo(html) {
  let result = {};
  const $ = cheerio.load(html);

  const descriptionEl = $(".mraOPb");
  if (descriptionEl.length > 0) {
    descriptionEl.each((idx, el) => {
      const description = el.children[0].children[0].data;
      result.description = description;
    });
  }

  result.success = Object.keys(result).length > 0 ? true : false;
  return result;
}
```

## Technologies Used

- Node.js
- JavaScript
- React
- React Router
- Redux
- MongoDB
- BCrypt, Passport, and JWT
- Cheerio
- Chart.js

## Challenges

- The main challenges came from the limitations of the external API
  - The free version can only submit 5 requests a minute
  - The provided search endpoint was too slow to function as a real time search bar. The solution was to use a list of major companies in JSON format. More companies can be searched, which utilises the endpoint, but it is not in real time.
  - Getting detailed price data did not return the company name. To include it in the company page, the name had to be saved to localStorate from the previous page before being redirected. Saving the name in the redux store was ineffective as the name would be removed upon refresh.
  - A lot of formatting was required to get the data into a useable state
- A bug where the chart didn't show any changes when a different time period was selected
  - In some occasions it showed two different charts which alternated when hovered
  - I ended up having to save the chart instance into a variable and clear that chart before rendering a new chart with different values
- Difficulty setting up RESTful endpoints.
  - In some cases, whether to create, update, or delete a Share could only be determined on the backend
  - Therefore, transactions or changes to the watchlist were sent to a single route where the information was processed.

## Project Design

[Design documents](/docs) were created. [Wireframes](/docs/wireframes) and [prototypes](/docs/prototypes) were also created using Adobe XD.

A [Trello board](https://trello.com/b/v72i18LN/trading-exp) was used to keep track of tasks.

## Possible Features to Add

- Further web scraping to get information such as P/E ratios, market cap etc.
- User profile to update details
- Account for different currencies and different time zones
