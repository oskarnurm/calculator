let currentNum = "";
let storage = [];

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operators = ["/", "*", "-", "+"];

const add = (a, b = 0) => +(a + b).toFixed(4);
const subtract = (a, b = 0) => +(a - b).toFixed(4);
const mutiply = (a, b = 1) => +(a * b).toFixed(4);
function divide(a, b = 1) {
  if (b === 0) {
    return "Undefined";
  }
  return +(a / b).toFixed(4);
}

function calculate(a, operator, b) {
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return mutiply(a, b);
  if (operator === "/") return divide(a, b);
  throw new Error(`Unknown operator: ${operator}`);
}

const display = document.querySelector(".display");
const calculator = document.querySelector(".calculator");
const dotBtn = document.getElementById("dot");

let justEvaluated = false;

calculator.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    input = e.target.textContent;
    if (justEvaluated) {
      storage = [];
      currentNum = "";
      display.textContent = "";
      dotBtn.disabled = false;
      justEvaluated = false;
    }

    if (input === "=") {
      if (currentNum.length) {
        storage.push(parseFloat(currentNum));
        currentNum = "";
      }
      // We exit early to quard against a case when we try to calculate without
      // enough input
      if (storage.length < 3) return;
      display.textContent = calculate(storage[0], storage[1], storage[2]);
      dotBtn.disabled = false;
      justEvaluated = true;
    }

    if (input === ".") {
      if (!currentNum.includes(".")) {
        currentNum += input;
        display.textContent += input;
        // Disable the "." button after the number buffer already includes one
        // to prevent the user from entering an illegal number
        dotBtn.disabled = true;
      }
    } else if (numbers.includes(input)) {
      currentNum += input;
      display.textContent += input;
    }

    // Push or update the operator. Also push the number if we were parsing one.
    // We also calculate the result of the first two numbers if we can.
    if (operators.includes(input)) {
      if (currentNum.length) {
        storage.push(parseFloat(currentNum));
        storage.push(input);
        dotBtn.disabled = false;

        if (storage.length >= 3) {
          const result = calculate(storage[0], storage[1], storage[2]);
          storage.splice(0, 3, result);
        }
        currentNum = "";
        display.textContent = storage.join("");
      } else if (storage.length > 0) {
        // Update the operator
        storage[1] = input;
        display.textContent = storage.join("");
      }
    }

    // Clear the display and storage
    if (input === "C") {
      currentNum = "";
      storage = [];
      display.textContent = "";
      dotBtn.disabled = false;
    }
  }
});
