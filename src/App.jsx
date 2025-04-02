import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Notfound from "./pages/notfound/Notfound";
import Layout from "./components/Layout";
import CompanyDetailPage from "./pages/companyDetailPage/CompanyDetailPage";
import InvestmentStatusPage from "./pages/investmentStatusPage/InvestmentStatusPage";
import ComparisonStatusPage from "./pages/comparisonStatusPage/ComparisonStatusPage";
import MyPage from "./pages/myPage/MyPage";
import MyResultPage from "./components/myPageTable/MyResultPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/companies/:id" element={<CompanyDetailPage />} />
            <Route path="/investment" element={<InvestmentStatusPage />} />
            <Route path="/comparison" element={<ComparisonStatusPage />} />
            <Route path="/my-company" element={<MyPage />} />
            {/* ↓ 지울 것임 */}
            <Route path="/comparison-result" element={<MyResultPage />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
