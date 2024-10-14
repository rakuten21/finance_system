const sampleData = [
    { date: '2024-09-01', type: 'Daily', amount: 500, total: 500 },
    { date: '2024-09-02', type: 'Daily', amount: 600, total: 1100 },
    { date: '2024-09-03', type: 'Daily', amount: 450, total: 1550 },
    { date: '2024-09-04', type: 'Weekly', amount: 3000, total: 4550 },
    { date: '2024-09-11', type: 'Weekly', amount: 3500, total: 8050 },
    { date: '2024-09-01', type: 'Monthly', amount: 15000, total: 23050 },
    { date: '2024-09-05', type: 'Daily', amount: 700, total: 2250 },
    { date: '2024-09-06', type: 'Weekly', amount: 2800, total: 10850 },
    { date: '2024-09-07', type: 'Monthly', amount: 12000, total: 35050 },
    { date: '2024-09-08', type: 'Daily', amount: 650, total: 2900 },
    { date: '2024-09-09', type: 'Weekly', amount: 4000, total: 12850 },
    { date: '2024-09-10', type: 'Monthly', amount: 16000, total: 51050 },
    { date: '2024-09-12', type: 'Daily', amount: 800, total: 3700 },
    { date: '2024-09-13', type: 'Weekly', amount: 3500, total: 16350 },
    { date: '2024-09-14', type: 'Monthly', amount: 18000, total: 69050 },
    { date: '2024-09-01', type: 'Daily', amount: 500, total: 500 },
    { date: '2024-09-02', type: 'Daily', amount: 600, total: 1100 },
    { date: '2024-09-03', type: 'Daily', amount: 450, total: 1550 },
    { date: '2024-09-04', type: 'Weekly', amount: 3000, total: 4550 },
    { date: '2024-09-11', type: 'Weekly', amount: 3500, total: 8050 },
    { date: '2024-09-01', type: 'Monthly', amount: 15000, total: 23050 },
    { date: '2024-08-01', type: 'Daily', amount: 700, total: 23750 },
    { date: '2024-08-02', type: 'Weekly', amount: 2000, total: 25750 },
    { date: '2024-08-10', type: 'Monthly', amount: 12000, total: 37750 },
    { date: '2024-07-15', type: 'Daily', amount: 800, total: 38550 },
    { date: '2024-07-16', type: 'Daily', amount: 1000, total: 39550 },
    { date: '2024-07-20', type: 'Weekly', amount: 2500, total: 42050 },
    { date: '2024-07-25', type: 'Monthly', amount: 13000, total: 55050 },
    { date: '2024-06-10', type: 'Daily', amount: 600, total: 55650 },
    { date: '2024-06-15', type: 'Weekly', amount: 1800, total: 57450 },
    { date: '2024-06-30', type: 'Monthly', amount: 11000, total: 68450 },
    { date: '2024-05-01', type: 'Daily', amount: 500, total: 68950 },
    { date: '2024-05-02', type: 'Daily', amount: 650, total: 69600 },
    { date: '2024-05-05', type: 'Weekly', amount: 2700, total: 72300 },
    { date: '2024-05-10', type: 'Monthly', amount: 9000, total: 81300 },
    { date: '2024-04-10', type: 'Daily', amount: 450, total: 81750 },
    { date: '2024-04-15', type: 'Weekly', amount: 3000, total: 84750 },
    { date: '2024-04-30', type: 'Monthly', amount: 14000, total: 98750 },
    { date: '2024-03-10', type: 'Daily', amount: 800, total: 99550 },
    { date: '2024-03-15', type: 'Weekly', amount: 3200, total: 102750 },
    { date: '2024-03-30', type: 'Monthly', amount: 10000, total: 112750 },
    { date: '2024-02-10', type: 'Daily', amount: 600, total: 113350 },
    { date: '2024-02-15', type: 'Weekly', amount: 2500, total: 115850 },
    { date: '2024-02-28', type: 'Monthly', amount: 15000, total: 130850 },
    { date: '2024-01-01', type: 'Daily', amount: 1000, total: 131850 },
    { date: '2024-01-05', type: 'Weekly', amount: 4000, total: 135850 },
    { date: '2024-01-15', type: 'Monthly', amount: 13000, total: 148850 }
    // Add more sample data as needed
];

// Pagination variables
let currentPage = 1;
let rowsPerPage = 5;
let filteredData = [...sampleData]; // Cloned data for filtering
let searchData = [...sampleData];   // Cloned data for search functionality

function populateTable(data) {
    const tableBody = document.querySelector("#forecast-table tbody");
    tableBody.innerHTML = "";

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageData = data.slice(startIndex, endIndex);

    pageData.forEach(row => {
        const newRow = `
            <tr>
                <td>${row.date}</td>
                <td>${row.type}</td>
                <td>${row.amount}</td>
                <td>${row.total}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', newRow);
    });

    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = endIndex >= data.length;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        populateTable(filteredData);
    }
}

function nextPage() {
    if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
        currentPage++;
        populateTable(filteredData);
    }
}

document.getElementById('entriesPerPage').addEventListener('change', function() {
    rowsPerPage = parseInt(this.value);
    currentPage = 1; // Reset to first page
    populateTable(filteredData);
});

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    filteredData = searchData.filter(row => 
        row.date.toLowerCase().includes(query) || 
        row.type.toLowerCase().includes(query) ||
        row.amount.toString().includes(query) || 
        row.total.toString().includes(query)
    );
    currentPage = 1; // Reset to first page
    populateTable(filteredData);
});

function filterData(filter) {
    if (filter === 'All') {
        filteredData = [...sampleData];
    } else {
        filteredData = sampleData.filter(row => row.type === filter);
    }
    currentPage = 1; // Reset to first page
    populateTable(filteredData);
}

window.onload = function() {
    populateTable(sampleData);

    // Example Chart.js configuration for Revenue Tracking
    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: ['2024-09-01', '2024-09-02', '2024-09-03'], // Sample Dates
            datasets: [{
                label: 'Revenue ($)',
                data: [500, 600, 450],
                backgroundColor: 'rgba(220, 53, 69, 0.2)',
                borderColor: 'rgba(220, 53, 69, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true
        }
    });

    // Example Chart.js configuration for Revenue Forecast
    const ctxForecast = document.getElementById('forecastChart').getContext('2d');
    new Chart(ctxForecast, {
        type: 'bar',
        data: {
            labels: ['2024-09-01', '2024-09-02', '2024-09-03'], // Sample Dates
            datasets: [{
                label: 'Forecast ($)',
                data: [700, 800, 900],
                backgroundColor: 'rgba(255, 193, 7, 0.2)',
                borderColor: 'rgba(255, 193, 7, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true
        }
    });
};
