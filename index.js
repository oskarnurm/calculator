let currentNum = "";
let tokens = [];

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "="];
const operators = ["/", "*", "-", "+"];

const clear = () => (display = []);
const add = (a, b = 0) => +(a + b).toFixed(4);
const subtract = (a, b = 0) => +(a - b).toFixed(4);
const mutiply = (a, b = 1) => +(a * b).toFixed(4);
function divide(a, b = 1) {
  if (b === 0) {
    return "Lets not break math, OK?";
  }
  return +(a / b).toFixed(4);
}

function operate(a, operator, b) {
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return mutiply(a, b);
  if (operator === "/") return divide(a, b);
  throw new Error(`Unknown operator ${operator}`);
}

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

const displayContainer = document.querySelector(".display");
const calculatorContainer = document.querySelector(".calculator");

let justEvaluated = false;

calculatorContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    input = e.target.textContent;
    if (justEvaluated) {
      tokens = [];
      currentNum = "";
      displayContainer.textContent = "";
      justEvaluated = false;
    }

    // push the last input and calculate the result
    if (input === "=") {
      if (currentNum.length > 0) {
        tokens.push(parseFloat(currentNum));
      }
      if (tokens.length >= 2) {
        console.log(tokens, tokens.length);
        displayContainer.textContent = operate(tokens[0], tokens[1], tokens[2]);
      }
      justEvaluated = true;
    }

    // parse numbers
    if (numbers.includes(input) && input !== "=") {
      // ignore duplicate dot
      if (input === "." && currentNum.includes(".")) {
        return;
      }
      currentNum += input;
      displayContainer.textContent += input;
    }

    // Push or update the operator. Also push the number if we were parsing one.
    // We also calculate the result of the first two numbers if we can.
    if (operators.includes(input)) {
      if (currentNum.length > 0) {
        const number = parseFloat(currentNum);
        Number.isNaN(number)
          ? (displayContainer.textContent = "Invalid number")
          : tokens.push(number);
        tokens.push(input);
        if (tokens.length >= 3) {
          const result = operate(tokens[0], tokens[1], tokens[2]);
          tokens.splice(0, 3, result);
          // can remove this print?
          // displayContainer.textContent = tokens.join("");
        }
        currentNum = "";
        displayContainer.textContent = tokens.join("");
      } else if (tokens.length > 0) {
        // update the operator
        tokens[1] = input;
        displayContainer.textContent = tokens.join("");
      } else {
        // Do nothing
        console.log("Number must precede operator");
      }
    }

    // clear the display and storage
    if (input === "C") {
      currentNum = "";
      tokens = [];
      displayContainer.textContent = "";
    }
  }
});
