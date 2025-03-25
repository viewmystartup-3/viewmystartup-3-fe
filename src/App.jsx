import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Notfound from "./components/Notfound/Notfound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
