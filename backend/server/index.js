require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 3030;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.SECRET_KEY

const finnhubClient = new finnhub.DefaultApi()


app.get("/api/quote/:symbol", (req, res) => {
  console.log("params", req.params.symbol)
  finnhubClient.quote(req.params.symbol, (error, data, response) => {
    res.json(data)
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
