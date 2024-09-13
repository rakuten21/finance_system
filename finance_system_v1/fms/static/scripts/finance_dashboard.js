const ctx = document.getElementById("incomeExpenseChart").getContext("2d");
const incomeExpenseChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Income",
        data: [
          12000, 15000, 13000, 17000, 19000, 14000, 16000, 21000, 22000, 18000,
          23000, 25000,
        ],
        backgroundColor: "rgba(35, 132, 132, 0.6)", // Darker teal color
        borderColor: "rgba(35, 132, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: [
          10600, 12000, 11000, 14000, 15000, 13000, 14000, 16000, 17000, 15000,
          18000, 20000,
        ],
        backgroundColor: "rgba(200, 50, 100, 0.6)", // Darker red color
        borderColor: "rgba(200, 50, 100, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const ctx1 = document.getElementById("netProfitMarginChart").getContext("2d");
const netProfitMarginChart = new Chart(ctx1, {
  type: "line",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Net Profit Margin (%)",
        data: [20, 25, 23, 28, 32, 27, 30, 34, 36, 29, 35, 38],
        backgroundColor: "rgba(34, 102, 180, 0.6)", // Darker blue color
        borderColor: "rgba(34, 102, 180, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
      },
    },
  },
});
