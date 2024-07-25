import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import JournalPage from "./components/journalPage/JournalPage";
import { LandingPage } from "./components/landingPage/LandingPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/journal/:date" element={<JournalPage />} />
      </Routes>
    </Router>
  );
};

export default App;
