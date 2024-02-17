import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Customers from "./pages/Customers";
import CustomerDetails from "./pages/CustomerDetails";
import Home from "./pages/Home";
import Logout from "./pages/Logout";

const reportUrl = "https://startdeliver-mock-api.glitch.me/report";
const customerUrl = "https://startdeliver-mock-api.glitch.me/customer";

function App() {
  const [reportData, setReportData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData(reportUrl, setReportData);
    fetchData(customerUrl, setCustomerData);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/home" element={<Home report={reportData.data} />} />
          <Route
            path="/customers"
            element={<Customers customerData={customerData} />}
          />
          <Route
            path="/customers-details/:name"
            element={<CustomerDetails />}
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
