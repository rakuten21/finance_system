document.addEventListener("DOMContentLoaded", () => {
  const applyFiltersBtn = document.getElementById("applyFilters");
  const resetFiltersBtn = document.getElementById("resetFilters");

  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      const selectedFilters = Array.from(
        document.querySelectorAll(".dropdown-menu .form-check-input:checked")
      ).map((checkbox) => checkbox.value);

      // Filter the table rows based on selected filters
      filterTable(selectedFilters);
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll(
        ".dropdown-menu .form-check-input"
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      // Reset the table rows to show all rows
      filterTable([]);
    });
  }
});

function filterTable(selectedFilters) {
  const tableRows = document.querySelectorAll("#accountsTableBody tr");

  tableRows.forEach((row) => {
    const accountTypeCell = row.querySelector("td:nth-child(3)");
    if (
      selectedFilters.length === 0 ||
      selectedFilters.includes(accountTypeCell.textContent.trim())
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Form validation for adding an account
const addAccountForm = document.getElementById("addAccountForm");
if (addAccountForm) {
  addAccountForm.addEventListener("submit", function (event) {
    const accountCode = document.getElementById("accountCode").value;
    const accountDescription =
      document.getElementById("accountDescription").value;

    let valid = true;

    if (!accountCode) {
      document.querySelector("#accountCode + .text-danger").textContent =
        "This field is required.";
      valid = false;
    } else {
      document.querySelector("#accountCode + .text-danger").textContent = "";
    }

    if (!accountDescription) {
      document.querySelector("#accountDescription + .text-danger").textContent =
        "This field is required.";
      valid = false;
    } else {
      document.querySelector("#accountDescription + .text-danger").textContent =
        "";
    }

    if (!valid) {
      event.preventDefault();
    }
  });
}

// Edit modal setup
const editAccountModal = document.getElementById("editAccountModal");
if (editAccountModal) {
  editAccountModal.addEventListener("show.bs.modal", function (event) {
    // Button that triggered the modal
    const button = event.relatedTarget;

    // Extract info from data-bs-* attributes
    const accountCode = button.getAttribute("data-account-code");
    const accountDescription = button.getAttribute("data-account-description");
    const accountType = button.getAttribute("data-account-type");

    // Update the modal's content with the account info
    document.getElementById("editAccountCode").value = accountCode;
    document.getElementById("editAccountDescription").value =
      accountDescription;
    document.getElementById("editAccountType").value = accountType;

    // Update the form action dynamically
    const form = document.getElementById("editAccountForm");
    form.action = `/edit/${accountCode}`;
  });
}
document
  .getElementById("entriesPerPage")
  .addEventListener("change", function () {
    const selectedValue = this.value;
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("entriesPerPage", selectedValue);
    currentUrl.searchParams.set("page", 1); // Reset to first page
    window.location.href = currentUrl.toString();
  });

document.addEventListener("DOMContentLoaded", function () {
  const archiveModal = document.getElementById("archiveConfirmationModal");
  const archiveAccountCode = document.getElementById("archiveAccountCode");
  const archiveAccountDescription = document.getElementById(
    "archiveAccountDescription"
  );
  const archiveAccountType = document.getElementById("archiveAccountType");
  const archiveModalLabel = document.getElementById("archiveModalLabel");
  const archiveConfirmButton = document.getElementById("archiveConfirmButton");
  const archiveForm = document.getElementById("archiveForm");

  archiveModal.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    const accountCode = button.getAttribute("data-account-code");
    const accountDescription = button.getAttribute("data-account-description");
    const accountType = button.getAttribute("data-account-type");
    const accountStatus = button.textContent.trim(); // "Archive" or "Activate"
    const actionUrl = button.getAttribute("data-archive-url");

    // Set the modal content based on the account status
    if (accountStatus === "Archive") {
      archiveModalLabel.textContent =
        "Are you sure you want to archive this account?";
      archiveConfirmButton.textContent = "Yes, Archive";
      archiveConfirmButton.classList.replace("btn-warning", "btn-danger"); // Change button style
    } else if (accountStatus === "Activate") {
      archiveModalLabel.textContent =
        "Are you sure you want to activate this account?";
      archiveConfirmButton.textContent = "Yes, Activate";
      archiveConfirmButton.classList.replace("btn-danger", "btn-warning"); // Change button style
    }

    // Set the form action URL and modal content
    archiveAccountCode.textContent = accountCode;
    archiveAccountDescription.textContent = accountDescription;
    archiveAccountType.textContent = accountType;
    archiveForm.action = actionUrl;
  });
});
