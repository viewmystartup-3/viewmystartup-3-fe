import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Notfound from "./pages/notfound/Notfound";
import Layout from "./components/Layout";
import InvestmentStatus from "./pages/investmentStatus/InvestmentStatus";
import CompanyDetailPage from "./pages/companyDetailPage/CompanyDetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/Investment" element={<InvestmentStatus />} />
            <Route path="/companies/:id" element={<CompanyDetailPage />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
