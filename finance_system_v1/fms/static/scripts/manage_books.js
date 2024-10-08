document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".edit-book-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const bookId = button.getAttribute("data-id");
      const bookName = button.getAttribute("data-name");
      const bookType = button.getAttribute("data-type"); // bookType from button data

      document
        .getElementById("editBookForm")
        .setAttribute("action", `/manage_books/edit_book/${bookId}`);

      document.getElementById("editBookId").value = bookId;
      document.getElementById("editBookName").value = bookName;
      document.getElementById("editBookType").value = bookType; // Populate bookType
    });
  });
});

document.getElementById("searchInput").addEventListener("input", function () {
  let query = this.value;
  console.log("Search Query:", query); // Add this to debug
  fetch(`/search_books?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("booksTableBody");
      tableBody.innerHTML = ""; // Clear the table

      data.books.forEach((book) => {
        const row = `
            <tr>
                <td class="text-center">${book.book_id}</td>
                <td>${book.book_name}</td>
                <td class="description">${book.description}</td>
                <td class="text-center">${book.start_date}</td>
                <td>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-danger btn-sm me-2 edit-book-btn"
                                data-id="${book.book_id}"
                                data-name="${book.book_name}"
                                data-description="${book.description}"
                                data-date="${book.start_date}"
                                data-bs-toggle="modal"
                                data-bs-target="#editBookModal">
                            Edit
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
      });
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const statusButtons = document.querySelectorAll(".archive-activate-btn");

  statusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const bookId = this.getAttribute("data-id");
      const bookName = this.getAttribute("data-name");
      const bookType = this.getAttribute("data-type");
      const bookStatus = this.getAttribute("data-status");

      const action = bookStatus === "Active" ? "archive" : "activate";

      // Update modal content
      document.getElementById("bookName").innerText =
        bookName || "Unknown Book"; // Update the name in the modal
      document.getElementById("bookType").innerText =
        bookType || "Unknown Type"; // Update the type in the modal
      document.getElementById("actionType").innerText = action;
      document.getElementById("actionInput").value = action;

      // Set form action dynamically
      const form = document.getElementById("statusForm");
      form.action = `/manage_books/update_status/${bookId}`;

      // Update button text and class based on action
      const confirmBtn = document.getElementById("confirmBtn");
      confirmBtn.innerText =
        action === "archive" ? "Yes, archive" : "Yes, activate";

      // Apply the correct classes: 'btn-danger' for Archive and 'btn-warning' for Activate
      confirmBtn.className = "btn"; // Reset the class
      confirmBtn.classList.add(
        action === "archive" ? "btn-danger" : "btn-warning"
      );
    });
  });
});
