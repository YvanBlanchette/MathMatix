// Function to generate a random integer between min and max (inclusive)
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Math Problem Generators
//Function to generate an addition problem
export function generateAdditionProblem(operand1, operand2) {
  return `${operand1} + ${operand2} = ${operand1 + operand2}`;
}


// Function to generate a subtraction problem
export function generateSubtractionProblem(operand1, operand2) {
  return operand1 > operand2
    ? `${operand1} - ${operand2} = ${operand1 - operand2}`
    : `${operand2} - ${operand1} = ${operand2 - operand1}`;
}

// Function to generate a multiplication problem
export function generateMultiplicationProblem(operand1, operand2) {
  return `${operand1} x ${operand2} = ${operand1 * operand2}`;
}

// Function to generate a division problem
export function generateDivisionProblem(operand1, operand2) {
  let result = operand1 * operand2;
  return `${result} ÷ ${operand2} = ${result / operand2}`;
}