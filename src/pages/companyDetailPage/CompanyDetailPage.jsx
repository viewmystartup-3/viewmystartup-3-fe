import React from "react";
import CompanyDetails from "../../components/companyDetails/CompanyDetails";
import InvestmentStatus from "../../components/investmentStatus/InvestmentStatus";

const CompanyDetailPage = ()=> {
  return(
    <div>
      <CompanyDetails/>
      <InvestmentStatus/>
    </div>
  )
}

export default CompanyDetailPage;