// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  const { date, ticker } = req.body;
  console.log("coming");
  const url1 = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&apiKey=PpY6zXmatpBnh8oOsAF72AXxpAdekSlf`;
  const url2 = `https://api.polygon.io/v1/open-close/${ticker}/${date}?adjusted=true&apiKey=PpY6zXmatpBnh8oOsAF72AXxpAdekSlf`;

  async function makeAPICall(url) {
    try {
      const response = await axios.get(url);
      if (response.data.status == "OK") {
        return response.data;
      } else {
        console.log("missing something");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  Promise.all([makeAPICall(url1), makeAPICall(url2)])
    .then((results) => {
      const [data1, data2] = results;
      console.log("API call 1 response:", data1);
      console.log("API call 2 response:", data2);
      res.send({
        message: "Succesful",
        result1: data1.results,
        result2: data2,
      });
    })
    .catch((error) => {
      console.error("Error making API calls:", error);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
