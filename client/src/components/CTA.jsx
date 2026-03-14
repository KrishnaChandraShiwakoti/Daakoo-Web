import React from "react";
import "../styles/cta.css";

const CTA = ({ title, onClick }) => {
  return <button className="cta">{title}</button>;
};

export default CTA;
