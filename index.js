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

const numContainer = document.querySelector(".numbers");
const opsContainer = document.querySelector(".operators");

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "="];
const operators = ["/", "*", "-", "+"];

numbers.forEach((number) => {
  const btn = document.createElement("button");
  btn.textContent = number;
  btn.classList.add("number");
  numContainer.appendChild(btn);
});

operators.forEach((operator) => {
  const btn = document.createElement("button");
  btn.textContent = operator;
  btn.classList.add("operator");
  opsContainer.appendChild(btn);
});

const calculator = document.querySelector(".calculator");
calculator.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log(e.target.textContent);
  }
});
