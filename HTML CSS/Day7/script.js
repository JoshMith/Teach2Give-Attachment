let display = document.getElementById("display");
let expression = document.getElementById("expression");

function appendCharacter(char) {
    display.value += char;
}

function clearDisplay() {
    display.value = "";
    expression.innerText = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        expression.innerText = display.value;
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function toggleSign() {
    if (display.value) {
        display.value = display.value.startsWith('-') ? display.value.slice(1) : '-' + display.value;
    }
}

// Handle keyboard input
document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (!isNaN(key) || "+-*/.%".includes(key)) {
        appendCharacter(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
