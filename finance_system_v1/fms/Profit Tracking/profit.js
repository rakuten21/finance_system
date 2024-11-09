const sampleData = [
    { date: '2024-09-01', totalRevenue: 500, totalExpense: 300, netProfit: 200 },
    { date: '2024-09-02', totalRevenue: 600, totalExpense: 360, netProfit: 240 },
    { date: '2024-09-03', totalRevenue: 450, totalExpense: 270, netProfit: 180 },
    { date: '2024-09-04', totalRevenue: 3000, totalExpense: 1800, netProfit: 1200 },
    { date: '2024-09-11', totalRevenue: 3500, totalExpense: 2100, netProfit: 1400 },
    { date: '2024-09-01', totalRevenue: 15000, totalExpense: 9000, netProfit: 6000 },
    { date: '2024-09-05', totalRevenue: 700, totalExpense: 420, netProfit: 280 },
    { date: '2024-09-06', totalRevenue: 2800, totalExpense: 1680, netProfit: 1120 },
    { date: '2024-09-07', totalRevenue: 12000, totalExpense: 7200, netProfit: 4800 },
    { date: '2024-09-08', totalRevenue: 650, totalExpense: 390, netProfit: 260 },
    { date: '2024-09-09', totalRevenue: 4000, totalExpense: 2400, netProfit: 1600 },
    { date: '2024-09-10', totalRevenue: 16000, totalExpense: 9600, netProfit: 6400 },
    { date: '2024-09-12', totalRevenue: 800, totalExpense: 480, netProfit: 320 },
    { date: '2024-09-13', totalRevenue: 3500, totalExpense: 2100, netProfit: 1400 },
    { date: '2024-09-14', totalRevenue: 18000, totalExpense: 10800, netProfit: 7200 },
    { date: '2024-08-01', totalRevenue: 700, totalExpense: 420, netProfit: 280 },
    { date: '2024-08-02', totalRevenue: 2000, totalExpense: 1200, netProfit: 800 },
    { date: '2024-08-10', totalRevenue: 12000, totalExpense: 7200, netProfit: 4800 },
    { date: '2024-07-15', totalRevenue: 800, totalExpense: 480, netProfit: 320 },
    { date: '2024-07-16', totalRevenue: 1000, totalExpense: 600, netProfit: 400 },
    { date: '2024-07-20', totalRevenue: 2500, totalExpense: 1500, netProfit: 1000 },
    { date: '2024-07-25', totalRevenue: 13000, totalExpense: 7800, netProfit: 5200 },
    { date: '2024-06-10', totalRevenue: 600, totalExpense: 360, netProfit: 240 },
    { date: '2024-06-15', totalRevenue: 1800, totalExpense: 1080, netProfit: 720 },
    { date: '2024-06-30', totalRevenue: 11000, totalExpense: 6600, netProfit: 4400 },
    { date: '2024-05-01', totalRevenue: 500, totalExpense: 300, netProfit: 200 },
    { date: '2024-05-02', totalRevenue: 650, totalExpense: 390, netProfit: 260 },
    { date: '2024-05-05', totalRevenue: 2700, totalExpense: 1620, netProfit: 1080 },
    { date: '2024-05-10', totalRevenue: 9000, totalExpense: 5400, netProfit: 3600 },
    { date: '2024-04-10', totalRevenue: 450, totalExpense: 270, netProfit: 180 },
    { date: '2024-04-15', totalRevenue: 3000, totalExpense: 1800, netProfit: 1200 },
    { date: '2024-04-30', totalRevenue: 14000, totalExpense: 8400, netProfit: 5600 },
    { date: '2024-03-10', totalRevenue: 800, totalExpense: 480, netProfit: 320 },
    { date: '2024-03-15', totalRevenue: 3200, totalExpense: 1920, netProfit: 1280 },
    { date: '2024-03-30', totalRevenue: 10000, totalExpense: 6000, netProfit: 4000 },
    { date: '2024-02-10', totalRevenue: 600, totalExpense: 360, netProfit: 240 },
    { date: '2024-02-15', totalRevenue: 2500, totalExpense: 1500, netProfit: 1000 },
    { date: '2024-02-28', totalRevenue: 15000, totalExpense: 9000, netProfit: 6000 },
    { date: '2024-01-01', totalRevenue: 1000, totalExpense: 600, netProfit: 400 },
    { date: '2024-01-05', totalRevenue: 4000, totalExpense: 2400, netProfit: 1600 },
    { date: '2024-01-15', totalRevenue: 13000, totalExpense: 7800, netProfit: 5200 }
];

// Pagination variables
let currentPage = 1;
let rowsPerPage = 5;
let filteredData = [...sampleData]; // Cloned data for filtering
let searchData = [...sampleData];   // Cloned data for search functionality

// Populate the table with data
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
                <td>${row.totalRevenue}</td>
                <td>${row.totalExpense}</td>
                <td>${row.netProfit}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', newRow);
    });

    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = endIndex >= data.length;
}

// Pagination functionality
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

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    filteredData = searchData.filter(row => 
        row.date.toLowerCase().includes(query) || 
        row.totalRevenue.toString().includes(query) ||
        row.totalExpense.toString().includes(query) || 
        row.netProfit.toString().includes(query)
    );
    currentPage = 1; // Reset to first page
    populateTable(filteredData);
});

// Filter functionality
function filterData(filter) {
    if (filter === 'All') {
        filteredData = [...sampleData];
    } else {
        filteredData = sampleData.filter(row => row.date.includes(filter));
    }
    currentPage = 1; // Reset to first page
    populateTable(filteredData);
}

// Initialize the table on load
window.onload = function() {
    populateTable(sampleData);
};

// Export to CSV
function exportToCSV() {
    let csvContent = "Date,Total Revenue,Total Expense,Net Profit\n";
    sampleData.forEach(row => {
        csvContent += `${row.date},${row.totalRevenue},${row.totalExpense},${row.netProfit}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "profit_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export to Excel
function exportToExcel() {
    let excelContent = "Date\tTotal Revenue\tTotal Expense\tNet Profit\n";
    sampleData.forEach(row => {
        excelContent += `${row.date}\t${row.totalRevenue}\t${row.totalExpense}\t${row.netProfit}\n`;
    });

    const blob = new Blob([excelContent], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "profit_data.xls");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Copy to Clipboard
function copyToClipboard() {
    let clipboardContent = "Date,Total Revenue,Total Expense,Net Profit\n";
    sampleData.forEach(row => { // Use sampleData instead of formattedData
        clipboardContent += `${row.date},${row.totalRevenue},${row.totalExpense},${row.netProfit}\n`;
    });

    navigator.clipboard.writeText(clipboardContent).then(() => {
        alert("Data copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

// Export to PDF
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Forecast Data", 10, 10);

    let yPosition = 20;
    doc.text("Date", 10, yPosition);
    doc.text("Total Revenue", 50, yPosition);
    doc.text("Total Expense", 90, yPosition);
    doc.text("Net Profit", 130, yPosition);

    yPosition += 10;

    sampleData.forEach(row => { // Use sampleData instead of formattedData
        doc.text(row.date, 10, yPosition);
        doc.text(row.totalRevenue.toString(), 50, yPosition);
        doc.text(row.totalExpense.toString(), 90, yPosition);
        doc.text(row.netProfit.toString(), 130, yPosition);
        yPosition += 10;
    });

    doc.save("profit_data.pdf");
}

// Print Table
function printTable() {
    const printContent = document.querySelector("#forecast-table").outerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Forecast Table</title></head><body>");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
}

// Event Listeners for Export, PDF, Print, Copy, and Excel buttons
document.querySelector(".btn-export:nth-child(1)").addEventListener("click", exportToCSV);
document.querySelector(".btn-export:nth-child(2)").addEventListener("click", exportToPDF);
document.querySelector(".btn-export:nth-child(3)").addEventListener("click", printTable);
document.querySelector(".btn-export:nth-child(4)").addEventListener("click", copyToClipboard); // Copy button
document.querySelector(".btn-export:nth-child(5)").addEventListener("click", exportToExcel); // Excel button