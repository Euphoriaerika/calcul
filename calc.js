/* Calculates the expression in the input field */

const calculator = () => {
  // get the input value
  const input = document.getElementById("display").value;

  // map of operations and their priorities
  const priority = {
    "+": 1,
    "*": 2,
    "/": 2,
  };

  // arrays to store numbers and operations
  const numbers = [];
  const operations = [];

  // temporary variable to store numbers
  let num = "";

  // variable to track minus sign
  let mark = 1;

  // loop through each character in the input
  for (const char of input) {
    // if character is a number or dot, add it to num
    if (!isNaN(parseInt(char)) || char === ".") {
      num += char;
      // if num is not empty, add number to numbers array and reset num
    } else if (num) {
      numbers.push(parseFloat(num) * mark);
      mark = 1;
      num = "";
    }

    // if character is an operation, add it to operations array
    if (char === "+" || char === "*" || char === "/") {
      operations.push(char);
      // if character is minus, multiply next number by -1 and add + to operations array
    } else if (char === "-") {
      mark *= -1;
      operations.push("+");
    }
  }

  // if there are any characters left in num, add it to numbers array
  if (num) numbers.push(parseFloat(num) * mark);

  // loop through operations array until it is empty
  while (operations.length) {
    // if the first operation has a lower priority than the second operation,
    // move first number and operation to the front of the arrays
    if (priority[operations[0]] < priority[operations[1]]) {
      const firstNum = numbers.shift();
      numbers.splice(2, 0, firstNum);

      const firstOp = operations.shift();
      operations.splice(1, 0, firstOp);
    }

    // get the first number, operation, and second number from the arrays
    const firstNum = numbers.shift();
    const firstOp = operations.shift();
    const secondNum = numbers.shift();

    // perform the operation on the two numbers and add the result to the beginning of the numbers array
    if (firstOp === "+") {
      numbers.unshift(firstNum + secondNum);
    } else if (firstOp === "*") {
      numbers.unshift(firstNum * secondNum);
    } else if (firstOp === "/") {
      numbers.unshift(firstNum / secondNum);
    }
  }

  // set the input value to the final result
  document.getElementById("display").value = numbers[0];
};

