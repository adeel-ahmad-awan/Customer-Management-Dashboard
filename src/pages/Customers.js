import React from "react";
import { Link } from "react-router-dom";

function Customers({ customerData }) {
  return (
    <>
      <h1 className="customerPageHeading">Customers</h1>

      <table className="customerPageTable">
        <thead>
          <tr>
            <th colSpan="2" className="customerPageTableHeading">
              Name
            </th>
            <th className="customerPageTableHeading">ARR</th>
            <th className="customerPageTableHeading">ID</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer) => (
            <tr className="customerPageTableRow" key={customer.id}>
              <td colSpan="2" className="customerPageTableRowData">
                <Link to={`/customers-details/${customer.name}`}>
                  {customer.name}
                </Link>
              </td>
              <td className="customerPageTableRowData">{customer.arr}</td>
              <td className="customerPageTableRowData">{customer.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Customers;
