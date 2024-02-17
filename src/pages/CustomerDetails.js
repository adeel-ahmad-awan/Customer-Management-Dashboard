import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CustomersDetails = () => {
  const { name } = useParams();
  const customerDataUrl = `https://startdeliver-mock-api.glitch.me/customer/?name=${name}`;

  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCustomerData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(customerDataUrl);
  }, [customerDataUrl]);

  return (
    <div>
      <h1 className="customerDetailsHeading">Customer Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        customerData.map((obj, index) => (
          <div key={index}>
            <table>
              <tbody className="customerDetailsTable">
                {Object.entries(obj).map(([key, value]) => (
                  <tr key={key}>
                    <td className="customerDetailsTableData">
                      <strong>{key}:</strong>{" "}
                    </td>
                    <td className="customerDetailsTableData">
                      {String(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomersDetails;
