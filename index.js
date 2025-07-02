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
