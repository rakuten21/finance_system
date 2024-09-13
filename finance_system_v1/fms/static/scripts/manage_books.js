document
  .getElementById("entriesPerPage")
  .addEventListener("change", function () {
    document.getElementById("entriesPerPageForm").submit();
  });
document.addEventListener("DOMContentLoaded", function () {
  // Add event listener for edit buttons
  document.querySelectorAll(".edit-book-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const bookId = button.getAttribute("data-id");
      const bookName = button.getAttribute("data-name");
      const bookDescription = button.getAttribute("data-description");
      const startDate = button.getAttribute("data-date");

      // Set form action and populate input fields
      document
        .getElementById("editBookForm")
        .setAttribute("action", `/manage_books/edit_book/${bookId}`);

      document.getElementById("editBookId").value = bookId;
      document.getElementById("editBookName").value = bookName;
      document.getElementById("editBookDescription").value = bookDescription;
      document.getElementById("editStartDate").value = startDate;
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
