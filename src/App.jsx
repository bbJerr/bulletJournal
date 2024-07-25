import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import JournalPage from "./components/JournalPage";
import { LandingPage } from "./components/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />{" "}
        {/* Set LandingPage as the default path */}
        <Route path="/home" element={<HomePage />} />{" "}
        {/* Update HomePage route */}
        <Route path="/journal/:date" element={<JournalPage />} />
      </Routes>
    </Router>
  );
};

export default App;
