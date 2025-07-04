const display = document.querySelector(".display__content");
const calculator = document.querySelector(".calculator");
const dotBtn = document.querySelector(".dot");

let justEvaluated = false;
let inputBuffer = "";
let inputStack = [];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operators = ["÷", "×", "-", "+"];

const mapOperatorToFunction = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => (b === 0 ? "Undefined" : a / b),
};

function calculate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  const fn = mapOperatorToFunction[op];
  return +fn(a, b).toFixed(4);
}

calculator.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    handleInput(e.target.textContent);
  }
});

function handleInput(input) {
  if (justEvaluated) {
    resetCalculator();
  }
  if (input === "=") {
    handleEquals();
  }
  if (input === "%") {
    handlePrecent();
  }
  if (numbers.includes(input)) {
    handleNumbers(input);
  }
  if (operators.includes(input)) {
    handleOperators(input);
  }
  if (input === "AC") {
    resetCalculator();
  }
  if (input === "C") {
    handleBackspace();
  }
}

function resetCalculator() {
  inputStack = [];
  inputBuffer = "";
  updateDisplay("");
  dotBtn.disabled = false;
  justEvaluated = false;
}

function updateDisplay(input) {
  display.textContent = input;
}

function handleEquals() {
  // Ignore repeated input and when we can't calculate
  if (justEvaluated || inputStack < 3) {
    return;
  }
  if (inputBuffer) {
    inputStack.push(inputBuffer);
  }
  const result = calculate(inputStack[0], inputStack[1], inputStack[2]);
  updateDisplay(result);
  currentNum = "";
  dotBtn.disabled = false;
  justEvaluated = true;
}

function handlePrecent() {
  if (!inputBuffer) return;
  const precent = (parseFloat(inputBuffer) / 100).toString();
  updateDisplay(precent);
  justEvaluated = true;
}

function handleNumbers(number) {
  // Prevent multple decimal points
  if (number === "." && inputBuffer.includes(".")) return;
  inputBuffer += number;
  display.textContent += number;
  dotBtn.disabled = inputBuffer.includes(".");
}

function handleOperators(operator) {
  if (inputBuffer) {
    inputStack.push(inputBuffer);
    inputBuffer = "";
    inputStack.push(operator);
    dotBtn.disabled = false;

    // Get intermediate result
    if (inputStack.length >= 3) {
      const result = calculate(inputStack[0], inputStack[1], inputStack[2]);
      inputStack.splice(0, 3, result);
      updateDisplay(inputStack.join(""));
    }
  }
  // Update operator in the stack (the last input) when inputBuffer is empty (if applicable)
  if (inputStack.length > 0) {
    inputStack[inputStack.length - 1] = operator;
    updateDisplay(inputStack.join(""));
  }
}

function handleBackspace() {
  if (inputBuffer) {
    inputBuffer = inputBuffer.slice(0, -1);
    updateDisplay(inputStack.join("") + inputBuffer);
    // Because we might delete the dot
    dotBtn.disabled = inputBuffer.includes(".");
  } else if (inputStack.length) {
    const lastInput = inputStack[inputStack.length - 1];
    // If the input we are about to remove is an operator we can simply pop
    // Otherwise we have to delete character by character if the input is a number
    if (operators.includes(lastInput)) {
      inputStack.pop();
    } else {
      let numStr = lastInput.toString();
      numStr = numStr.slice(0, -1);
      if (numStr) {
        inputStack[inputStack.length - 1] = numStr;
      } else inputStack.pop();
    }
    updateDisplay(inputStack.join(""));
    dotBtn.disabled = false;
  }
}
