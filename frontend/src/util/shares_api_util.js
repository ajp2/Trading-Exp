import axios from "axios";

export const searchShares = searchInput =>
  axios.get("/api/shares/search", { params: { text: searchInput } });
