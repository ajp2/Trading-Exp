export const objectToArray = obj => {
  const keys = Object.keys(obj).sort();
  const values = keys.map(key => obj[key]);
  return [keys, values];
};

export const formatIntradayPrices = apiInfo => {
  const times = apiInfo[0].slice(22);
  const prices = apiInfo[1].slice(22);

  const formattedTimes = times.map(time => time.split(" ")[1]);
  formattedTimes.unshift("Opening");
  const formattedPrices = prices.map(item => item["4. close"]);
  formattedPrices.unshift(prices[0]["1. open"]);

  return [formattedTimes, formattedPrices];
};

export const formatDailyPrices = apiInfo => {
  const times = apiInfo[0].slice(apiInfo[0].length - 23);
  const prices = apiInfo[1].slice(apiInfo[0].length - 23);

  const formattedPrices = prices.map(item => item["4. close"]);
  return [times, formattedPrices];
};

export const formatMonthlyPrices = apiInfo => {
  console.log("monthly prices");
  console.log(apiInfo);
};
