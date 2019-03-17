import axios from "axios";

export const signup = user => axios.post("/api/users/register", user);
