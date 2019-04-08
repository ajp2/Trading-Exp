import axios from "axios";

export const searchShares = searchInput =>
  axios.get("/api/shares/search", { params: { text: searchInput } });

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
