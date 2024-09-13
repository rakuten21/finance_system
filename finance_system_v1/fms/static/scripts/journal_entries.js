document.addEventListener("DOMContentLoaded", function () {
  const addRowButton = document.getElementById("addRow");
  const journalTableBody = document.querySelector("#journalTable tbody");
  const rowTemplate = document.getElementById("newRowTemplate").content;
  let rowToDelete = null;

  const totalDebitElem = document.getElementById("totalDebit");
  const totalCreditElem = document.getElementById("totalCredit");

  function updateTotals() {
    let totalDebit = 0;
    let totalCredit = 0;

    document.querySelectorAll('input[name="debit[]"]').forEach((input) => {
      totalDebit += parseFloat(input.value) || 0;
    });

    document.querySelectorAll('input[name="credit[]"]').forEach((input) => {
      totalCredit += parseFloat(input.value) || 0;
    });

    totalDebitElem.textContent = totalDebit.toFixed(2);
    totalCreditElem.textContent = totalCredit.toFixed(2);
  }

  addRowButton.addEventListener("click", function (event) {
    event.preventDefault();
    const newRow = document.importNode(rowTemplate, true);
    journalTableBody.appendChild(newRow);
  });

  journalTableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-row")) {
      event.preventDefault();

      const row = event.target.closest("tr");
      const inputs = row.querySelectorAll("input, select");
      let hasData = false;

      inputs.forEach((input) => {
        if (input.value.trim() !== "") {
          hasData = true;
        }
      });

      if (hasData) {
        rowToDelete = row;
        const deleteRowModal = new bootstrap.Modal(
          document.getElementById("deleteRowModal")
        );
        deleteRowModal.show();
      } else {
        row.remove();
      }
      updateTotals();
    }
  });

  const confirmDeleteButton = document.getElementById("confirmDeleteRow");
  confirmDeleteButton.addEventListener("click", function () {
    if (rowToDelete) {
      rowToDelete.remove();
      rowToDelete = null;
      const deleteRowModal = bootstrap.Modal.getInstance(
        document.getElementById("deleteRowModal")
      );
      deleteRowModal.hide();
      updateTotals();
    }
  });

  journalTableBody.addEventListener("change", function (event) {
    const row = event.target.closest("tr");

    if (event.target.classList.contains("account-code-dropdown")) {
      const selectedCode = event.target.value;
      const descriptionDropdown = row.querySelector(
        ".account-description-dropdown"
      );

      if (selectedCode) {
        descriptionDropdown.disabled = false;

        for (let option of descriptionDropdown.options) {
          if (option.value === selectedCode) {
            descriptionDropdown.value = option.value;
            break;
          }
        }
      } else {
        descriptionDropdown.disabled = true;
        descriptionDropdown.value = "";
      }
    }

    if (event.target.classList.contains("account-description-dropdown")) {
      const selectedDescription = event.target.value;
      const codeDropdown = row.querySelector(".account-code-dropdown");

      if (selectedDescription) {
        for (let option of codeDropdown.options) {
          if (option.value === selectedDescription) {
            codeDropdown.value = option.value;
            break;
          }
        }
      }
    }

    if (
      event.target.classList.contains("debit_amount") ||
      event.target.classList.contains("credit_amount")
    ) {
      updateTotals();
    }
  });

  const journalEntryDate = document.getElementById("journalEntryDate");
  const journalEntryPeriod = document.getElementById("journalEntryPeriod");

  function setDateAndPeriod() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    journalEntryDate.value = `${year}-${month}-${day}`;

    journalEntryPeriod.value = `${year}-${month}`;
  }

  const addJEModal = document.getElementById("addJEModal");
  addJEModal.addEventListener("show.bs.modal", setDateAndPeriod);

  journalTableBody.addEventListener("input", function (event) {
    if (
      event.target.classList.contains("debit_amount") ||
      event.target.classList.contains("credit_amount")
    ) {
      updateTotals();
    }
  });
});
