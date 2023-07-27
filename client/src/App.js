import React from "react";
import { Bar } from "react-chartjs-2";
import { data } from "./Component/Util";
import { options } from "./Component/Util";
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SmallBarData from "./Component/SmallBar";

export default function App() {
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(true);
  const [date, setDate] = useState("");
  const [ticker, setTicker] = useState("");
  const [smallBarData, setSmallBarData] = useState({});
  const labels = result.map((e, index) => {
    if (index < 10) return e.T;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Low",
        data: result.map((e) => {
          return e.h;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "High",
        data: result.map((e) => {
          return e.l;
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/fetchStockData",
      {
        date,
        ticker,
      }
    );
    if (response.statusText === "OK") {
      setResult(response.data.result1.slice(0, 10));
      setSmallBarData(response.data.result2);
      setShow(!show);
    } else {
      console.log("result not expected!");
    }
  };

  return (
    <div>
      {show ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>
          <div>
            <label htmlFor="ticker">Ticker</label>
            <input
              id="ticker"
              name="ticker"
              type="ticker"
              onChange={(e) => setTicker(e.target.value)}
              value={ticker}
            />
          </div>
          <button type="submit">Submit</button>{" "}
        </form>
      ) : (
        <div
          className="container outer-box"
          style={{ display: "flex", width: "100%", flex: "2" }}
        >
          <div
            style={{
              width: "100%",
              background: "aliceblue",
              border: "1px solid #c0c0f7",
              borderRadius: "20px",
              padding: "20px",
              margin: "10px",
            }}
          >
            <Bar options={options} data={data} />
          </div>
          <SmallBarData data={smallBarData} />
        </div>
      )}
    </div>
  );
}
