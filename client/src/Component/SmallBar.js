import React from "react";
import ColorfulCard from "./CustomCard";

const SmallBarData = ({ data }) => {
  console.log("smallbardata", data);

  const cardsData = [
    { color: "#ff5722", heading: "Low", number: data.low },
    { color: "#03a9f4", heading: "High", number: data.high },
    { color: "#8bc34a", heading: "Open", number: data.open },
    { color: "#e91e63", heading: "Close", number: data.close },
    { color: "#673ab7", heading: "Volume", number: data.volume },
  ];

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const cardWrapperStyle = {
    flex: "0 0 45%",
    margin: "5px",
  };
  return (
    <div
      style={{
        display: "flex",
        background: 'aliceblue',
        border: '1px solid #c0c0f7',
        borderRadius: '20px',
        padding: '20px',
        margin: '10px',
      }}
    >
     
      <div style={containerStyle}>
        {cardsData.map((card, index) => (
          <div key={index} style={cardWrapperStyle}>
            <ColorfulCard key={index} {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmallBarData;
