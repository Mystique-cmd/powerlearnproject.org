// === Feature 1: Theme Toggle ===
// Toggles between light and dark mode when the button is clicked
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// === Feature 2: Live Character Counter ===
// Updates the character count in real-time as the user types
const liveMessage = document.getElementById("liveMessage");
const charCountDisplay = document.getElementById("charCount");

liveMessage.addEventListener("input", () => {
  charCountDisplay.textContent = `Characters: ${liveMessage.value.length}`;
});

// === Custom Form Validation ===
// Validates the form fields before allowing submission
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Stop form from submitting by default

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const errorDisplay = document.getElementById("formError");

  let errors = [];

  // Validate name
  if (name === "") {
    errors.push("Name is required.");
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errors.push("Enter a valid email address.");
  }

  // Validate message length
  if (message.length < 10) {
    errors.push("Message must be at least 10 characters.");
  }

  // Show errors or success
  if (errors.length > 0) {
    errorDisplay.textContent = errors.join(" ");
    errorDisplay.style.color = "red";
  } else {
    errorDisplay.textContent = "Form submitted successfully!";
    errorDisplay.style.color = "green";
    this.reset(); // Clear form fields
    charCountDisplay.textContent = "Characters: 0"; // Reset counter
  }
});
