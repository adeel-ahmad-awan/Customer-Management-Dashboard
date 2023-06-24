import Navbar from "./Navbar";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

const reportUrl = "https://startdeliver-mock-api.glitch.me/report";
const customerUrl = "https://startdeliver-mock-api.glitch.me/customer";

function App() {
  const [data, setData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    fetchData(reportUrl, setData);
    fetchData(customerUrl, setCustomerData);
  }, []);

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(1,data.data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/home"
            element={<Home report={data.data} />}
          />
          <Route
            path="/customers"
            element={<Customers customerData={customerData} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
