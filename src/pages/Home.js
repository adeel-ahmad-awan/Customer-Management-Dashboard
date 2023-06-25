import React from "react";
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();

  if (!props.report) {
    navigate("/");
    return null;
  }

  const barChartLabels = props.report.map((item) => {
    const [year, month] = item.month.split("-");
    const formattedDate = new Date(year, month - 1).toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      }
    );
    return formattedDate;
  });

  const barChartData = props.report.map((item) => parseInt(item.arr));

  const barChartDataObject = {
    labels: barChartLabels,
    datasets: [
      {
        label: "",
        data: barChartData,
        backgroundColor: ["#2050fe"],
      },
    ],
  };

  const barChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  const sumArr = props.report
    .map((item) => parseInt(item.arr))
    .reduce((total, value) => total + value, 0);
  const sumSeats = props.report
    .map((item) => parseInt(item.seats))
    .reduce((total, value) => total + value, 0);

  const convertNumberToWords = (number) => {
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixIndex = Math.floor(Math.log10(number) / 3);

    const scaledNumber = (number / Math.pow(10, suffixIndex * 3)).toFixed(2);

    return scaledNumber + " " + suffixes[suffixIndex];
  };
  return (
    <div>
      <h1 className="homePageHeading">Home</h1>

      <table className="homePageTable">
        <thead>
          <tr>
            <th className="homePageTableHeading">ARR</th>
            <th className="homePageTableHeading">Seats</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="homePageTableData">
              ${convertNumberToWords(sumArr)}
            </td>
            <td className="homePageTableData">{sumSeats}</td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />
      <h3 className="homePageNewArr"> New ARR per month</h3>
      <div className="barChartParentDiv">
        {<Bar data={barChartDataObject} options={barChartOptions} />}
      </div>
    </div>
  );
}

export default Home;
