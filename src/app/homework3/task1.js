const express = require("express");
const bodyParser = require("body-parser");

const suggestRoutes = require("./api/suggestionRoutes");
const userRoutes = require("./api/userRoutes");

const app = express();

const PORT = process.env.PORT || "3001";

app.use(bodyParser.json());

app.use('/users', suggestRoutes);

app.use('/user', userRoutes);

app.all("*", (req, res) => {
  return res.status(404).end();
});

app.listen(PORT,() => {
  console.log("Server listening on port number ", PORT);
});
