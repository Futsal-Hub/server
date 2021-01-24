if (process.env.NODE_ENV === "development") { require("dotenv").config()}
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log("app listen on port", PORT);
});

module.exports = app;
