import React from "react";
import Home from "./components/HomePage"; // Change this to test different pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/images" element={<ImageScroller />} /> */}
            </Routes>
        </Router>
  );
}

export default App;
