import React from "react";
import { useNavigate } from "react-router-dom";
import "./landingPage.css";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="grid-background">
      <div className="landing-page-content">
        <img src="/bujo-logo.png" alt="bujo logo" />
        <button onClick={() => navigate("/home")} className="btn"><span>start journal entry</span></button>
      </div>
    </div>
  );
};
