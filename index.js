let storage = [];
const clear = () => (storage = []);
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const mutiply = (a, b) => a * b;
function divide(a, b) {
  if (b === 0) {
    throw new Error("Lets not break math, OK?");
  }
  return a / b;
}

function operate(operator, a, b) {
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return mutiply(a, b);
  if (operator === "/") return divide(a, b);
  throw new Error(`Unknown operator ${operator}`);
}

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "="];
const operators = ["/", "*", "-", "+"];

const numContainer = document.querySelector(".numbers");
numbers.forEach((number) => {
  const btn = document.createElement("button");
  btn.textContent = number;
  btn.classList.add("number");
  numContainer.appendChild(btn);
});

const opsContainer = document.querySelector(".operators");
operators.forEach((operator) => {
  const btn = document.createElement("button");
  btn.textContent = operator;
  btn.classList.add("operator");
  opsContainer.appendChild(btn);
});

function updateDisplay() {
  const display = document.querySelector(".display");
  display.textContent = storage.join("");
}

const calculatorContainer = document.querySelector(".calculator");
calculatorContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    buttonContent = e.target.textContent;
    if (buttonContent === "C") {
      storage = [];
      updateDisplay();
    } else if (buttonContent === "=") {
      console.log("operate");
    } else {
      storage.push(buttonContent);
      updateDisplay();
    }
  }
});
