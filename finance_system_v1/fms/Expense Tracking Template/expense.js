// Sample data for expenses (modify as needed)
const expenseData = [
    { date: '2024-09-01', category: 'Food', supplier: 'Wet Market', amount: 500, total: 500 },
    { date: '2024-09-02', category: 'Transport', supplier: 'Wet Market', amount: 200, total: 700 },
    { date: '2024-09-03', category: 'Entertainment', supplier: 'Wet Market', amount: 450, total: 1150 },
    { date: '2024-09-04', category: 'Bills', supplier: 'Private Company', amount: 300, total: 1450 },
    { date: '2024-09-05', category: 'Shopping', supplier: 'Private Company', amount: 800, total: 2250 },
    { date: '2024-09-06', category: 'Groceries', supplier: 'Private Company', amount: 300, total: 2550 },
    { date: '2024-09-07', category: 'Food', supplier: 'Private Company', amount: 600, total: 3150 },
];

// Pagination variables
let currentPage = 1;
let rowsPerPage = 5;
let filteredData = [...expenseData];
let searchData = [...expenseData];

// Function to populate the table with data
function populateTable(data) {
    const tableBody = document.querySelector("#forecast-table tbody");
    tableBody.innerHTML = ""; // Clear table body

    // Slice data for current page
    const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // Insert rows into the table
    paginatedData.forEach((row) => {
        const tableRow = `
            <tr>
                <td>${row.date}</td>
                <td>${row.category}</td>
                <td>${row.supplier}</td>
                <td>${row.amount}</td>
                <td>${row.total}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", tableRow);
    });

    updatePagination(data);
}

// Function to filter data based on category
function filterData(category) {
    filteredData = category === 'All' ? searchData : searchData.filter(row => row.category === category);
    currentPage = 1; // Reset to page 1 after filtering
    populateTable(filteredData);
}

// Function to handle pagination
function updatePagination(data) {
    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

// Event listener for changing entries per page
document.getElementById('entriesPerPage').addEventListener('change', function () {
    rowsPerPage = parseInt(this.value);
    currentPage = 1;
    populateTable(filteredData);
});

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    searchData = expenseData.filter(row => 
        row.category.toLowerCase().includes(searchValue) ||
        row.date.includes(searchValue)
    );
    filteredData = [...searchData];
    currentPage = 1;
    populateTable(filteredData);
});

// Initial table population
populateTable(expenseData);

// Unified chart options for consistent sizing
const chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    width: 400,
    height: 400,
};

// Chart.js Implementation
document.addEventListener('DOMContentLoaded', () => {
    // Expense Tracking Line Chart
    const ctxRevenue = document.getElementById('expenseChart').getContext('2d');
    const expenseTrackingChart = new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: expenseData.map(data => data.date),
            datasets: [{
                label: 'Expenses',
                data: expenseData.map(data => data.amount),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: chartOptions
    });

    // Expense Forecast Pie Chart
    const ctxForecastPie = document.getElementById('forecastPieChart').getContext('2d');
    const categories = {
        Rent: 1000,
        Utilities: 300,
        Groceries: 500,
        Transport: 200,
        Entertainment: 150
    };
    const forecastData = generateCategoryForecast(categories, 1.05); // 5% growth

    const expenseForecastPieChart = new Chart(ctxForecastPie, {
        type: 'pie',
        data: {
            labels: Object.keys(forecastData),
            datasets: [{
                data: Object.values(forecastData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            ...chartOptions,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
});

/**
 * Generates forecasted expenses for each category by applying a growth rate.
 * @param {Object} categories - Initial expense amounts by category
 * @param {number} growthRate - Growth rate to apply to each category
 * @returns {Object} - Forecasted expense amounts by category
 */
function generateCategoryForecast(categories, growthRate) {
    const forecast = {};
    for (const [category, amount] of Object.entries(categories)) {
        forecast[category] = Math.round(amount * growthRate); // Apply growth rate
    }
    return forecast;
}

// Unified download button to save both charts
document.querySelector(".download-icon").addEventListener("click", function () {
    // Download the line chart
    const chartCanvas1 = document.getElementById("expenseChart");
    const chartImage1 = chartCanvas1.toDataURL("image/png");
    const link1 = document.createElement("a");
    link1.href = chartImage1;
    link1.download = "expense_tracking_chart.png";
    link1.click();

    // Download the pie chart
    const chartCanvas2 = document.getElementById("forecastPieChart");
    const chartImage2 = chartCanvas2.toDataURL("image/png");
    const link2 = document.createElement("a");
    link2.href = chartImage2;
    link2.download = "expense_forecast_chart.png";
    link2.click();
});
