import React from 'react';

const ColorfulCard = ({ color, heading, number }) => {
  const cardStyle = {
    backgroundColor: color,
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    color: 'white',
    flex: '1',
    width:"150px",
    height:"150px",
    margin:"10px",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 4px )",
    WebkitBackdropFilter:"blur(4px)",
    border: "1px solid rgba( 255, 255, 255, 0.18 )"
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '10px',
  };

  const numberStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
  };

  return (
    <div style={cardStyle}>
      <div style={headingStyle}>{heading}</div>
      <div style={numberStyle}>{number}</div>
    </div>
  );
};

export default ColorfulCard;
