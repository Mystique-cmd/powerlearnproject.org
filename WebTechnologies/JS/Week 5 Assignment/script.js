
// Part 1: Variables & Conditionals


let userName = "Hillary";            // variable declaration
let score = 75;                      // variable declaration

if (score >= 50) {
    console.log("Pass");
} else {
    console.log("Fail");
}
// Part 2: Custom Functions


function greetUser(name) {
    console.log(`Hello, ${name}!`);
}

function calculateSquare(num) {
    return num * num;
}

// Example calls
greetUser(userName);
console.log(`Square of 5 is ${calculateSquare(5)}`);

// Part 3: Loops


// for loop example
for (let i = 1; i <= 3; i++) {
    console.log(`For Loop Count: ${i}`);
}

// while loop example
let count = 1;
while (count <= 3) {
    console.log(`While Loop Count: ${count}`);
    count++;
}


// Part 4: DOM Interactions

const titleEl = document.getElementById("page-title");
const msgEl = document.getElementById("message");
const btnEl = document.getElementById("action-btn");
const listContainer = document.getElementById("list-container");

btnEl.addEventListener("click", () => {
    // 1. Change text content
    msgEl.textContent = "Button clicked! Here’s your list:";

    // 2. Change style dynamically
    titleEl.style.color = "blue";

    // 3. Add list items
    listContainer.innerHTML = ""; // clear existing
    const items = ["Apple", "Banana", "Cherry"];
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        listContainer.appendChild(li);
    });
});
