import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Temporary from "./Pages/Temporary";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Temporary />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
