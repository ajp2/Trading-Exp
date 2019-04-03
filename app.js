const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const shares = require("./routes/api/shares");
const news = require("./routes/api/news");
const path = require("path");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use("/api/users", users);
app.use("/api/shares", shares);
app.use("/api/news", news);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
