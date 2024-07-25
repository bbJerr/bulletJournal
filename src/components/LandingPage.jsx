import React from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Journal App</h1>
      <button onClick={() => navigate("/home")}>Go to Calendar</button>
    </div>
  );
};
