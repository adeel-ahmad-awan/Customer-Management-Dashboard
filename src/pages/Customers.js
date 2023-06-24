import React from "react";

function Customers(props) {
  return (
    <div>
      <p>{JSON.stringify(props.customerData)}</p>
    </div>
  );
}

export default Customers;
