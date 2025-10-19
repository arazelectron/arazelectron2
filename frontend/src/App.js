import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import "@/App.css";
import HomePage from "./HomePage";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/araz79" element={<AdminPanel />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;