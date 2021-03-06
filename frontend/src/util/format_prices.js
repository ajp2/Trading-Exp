export const objectToArray = obj => {
  // error if obj is undefined. This is due to too many requests to API
  try {
    const keys = Object.keys(obj).sort();
    const values = keys.map(key => obj[key]);
    return [keys, values];
  } catch (err) {
    return false;
  }
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
  const numberOfMonths = apiInfo[0].length >= 120 ? 120 : apiInfo[0].length - 1;
  const times = apiInfo[0].slice(apiInfo[0].length - numberOfMonths);
  const prices = apiInfo[1].slice(apiInfo[0].length - numberOfMonths);

  const formattedPrices = prices.map(item => item["4. close"]);
  return [times, formattedPrices];
};

export const displayMonthlyPrices = (labels, prices) => {};

export const displayYearlyPrices = (labels, prices, years) => {
  const length = labels.length;
  const months = years * 12 + 1;
  if (length < months) return [labels, prices];
  const formattedLabels = labels.slice(length - months);
  const formattedPrices = prices.slice(length - months);
  return [formattedLabels, formattedPrices];
};
