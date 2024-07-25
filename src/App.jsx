import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import JournalPage from "./components/JournalPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journal/:date" element={<JournalPage />} />
      </Routes>
    </Router>
  );
};

export default App;
