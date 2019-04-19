import axios from "axios";

export const searchShares = searchInput =>
  axios.get("/api/shares/search", { params: { text: searchInput } });

export const getQuote = ticker => axios.get(`/api/shares/quote/${ticker}`);

// timeFormat: "intraday", "daily", "monthly"
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

export const fetchCompanyDescription = companyName =>
  axios.get("/api/shares/description", {
    params: { companyName }
  });

export const getOwnedShares = (user_id, ticker) =>
  axios.get(`/api/shares/${ticker}`, { params: { user_id } });

export const updateShareInfo = (user_id, ticker, info) =>
  axios.post(`/api/shares/${ticker}`, { info, user_id });

export const getShares = user_id =>
  axios.get("/api/shares", { params: { user_id } });

export const createTrade = trade =>
  axios.post(`/api/trades/${trade.ticker}`, trade);

export const getTrades = user_id =>
  axios.get("/api/trades", { params: { user_id } });
