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
    return "Undefined";
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

const displayContainer = document.querySelector(".display");
const calculatorContainer = document.querySelector(".calculator");
const dotBtn = document.getElementById("dot");

let justEvaluated = false;

calculatorContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    input = e.target.textContent;
    if (justEvaluated) {
      tokens = [];
      currentNum = "";
      displayContainer.textContent = "";
      dotBtn.disabled = false;
      justEvaluated = false;
    }

    // push the last input and calculate the result
    if (input === "=") {
      if (currentNum.length > 0) {
        tokens.push(parseFloat(currentNum));
      }
      if (tokens.length >= 2) {
        displayContainer.textContent = operate(tokens[0], tokens[1], tokens[2]);
      }
      dotBtn.disabled = false;
      justEvaluated = true;
    }

    // parse numbers
    if (numbers.includes(input) && input !== "=") {
      // ignore duplicate dot
      if (input === "." || currentNum.includes(".")) {
        dotBtn.disabled = true;
      }
      currentNum += input;
      displayContainer.textContent += input;
    }

    // Push or update the operator. Also push the number if we were parsing one.
    // We also calculate the result of the first two numbers if we can.
    if (operators.includes(input)) {
      if (currentNum.length > 0) {
        const number = parseFloat(currentNum);
        tokens.push(number);
        tokens.push(input);
        dotBtn.disabled = false;
        if (tokens.length >= 3) {
          const result = operate(tokens[0], tokens[1], tokens[2]);
          tokens.splice(0, 3, result);
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
      dotBtn.disabled = false;
    }
  }
});
