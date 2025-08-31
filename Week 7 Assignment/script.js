// Global variable for the magic box element
const magicBox = document.getElementById("magicBox");

// Function to change box color (parameter: color)
function changeBoxColor(color) {
  magicBox.style.backgroundColor = color;
}

// Function to start spinning animation
function startSpin() {
  magicBox.classList.add("spin");
}

// Function to stop spinning animation
function stopSpin() {
  magicBox.classList.remove("spin");
}

// Function to calculate speed (demonstrates parameters & return value)
function calculateSpeed(distance, time) {
  // Local variable (scope limited to this function)
  let speed = distance / time;
  return speed; // return value
}


// Event: Spin button
document.getElementById("spinBtn").addEventListener("click", () => {
  startSpin();
});

// Event: Change color button
document.getElementById("colorBtn").addEventListener("click", () => {
  // Pick a random color
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
  changeBoxColor(randomColor);
});

// Event: Reset button
document.getElementById("resetBtn").addEventListener("click", () => {
  stopSpin();
  changeBoxColor("royalblue");
  magicBox.style.transform = "scale(1)";
});

// === Form Handling ===
document.getElementById("speedForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Get values from form
  const distance = parseFloat(document.getElementById("distance").value);
  const time = parseFloat(document.getElementById("time").value);

  // Use our reusable function
  const speed = calculateSpeed(distance, time);

  // Display result
  document.getElementById("speedResult").textContent =
    `Calculated speed: ${speed.toFixed(2)} px/sec`;
});
