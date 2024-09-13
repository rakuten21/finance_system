const ctx = document.getElementById("revenueChart").getContext("2d");
const revenueChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Revenue",
        data: [61200, 51500, 37700, 44400, 75320, 58000, 120340],
        borderColor: "rgba(255, 102, 0, 1)", // Orange color
        backgroundColor: "rgba(255, 102, 0, 0.2)", // Light orange color
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 40, // Add padding at the bottom
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          maxRotation: 45, // Rotate labels if they are long
          autoSkip: true, // Skip some labels if necessary
          padding: 10, // Padding for labels
        },
        grid: {
          drawBorder: false, // Hide x-axis border if desired
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false, // Hide y-axis border if desired
        },
      },
    },
  },
});
