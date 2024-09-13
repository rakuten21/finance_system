document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");

  if (!sidebar.classList.contains("expand")) {
    sidebar.classList.add("expand");
  }
});

// Function to resize textarea based on its content
function resizeTextarea(textarea) {
  textarea.style.height = "auto"; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + "px"; // Set height based on scrollHeight
}

// Attach the resizeTextarea function to the input event for each textarea
document.querySelectorAll("textarea").forEach(function (textarea) {
  textarea.addEventListener("input", function () {
    resizeTextarea(textarea);
  });

  // Trigger the resize function on page load for any pre-filled textareas
  resizeTextarea(textarea);
});
