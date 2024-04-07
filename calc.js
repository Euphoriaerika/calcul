/**
 * Class representing an operator in an infix expression.
 */
class Operator {
  /**
   * Creates a new Operator instance.
   *
   * @param {string} symbol The symbol of the operator.
   * @param {number} precedence The precedence of the operator.
   * @param {string} associativity The associativity of the operator
   *     ("left" or "right").
   */
  constructor(symbol, precedence, associativity) {
    this.symbol = symbol;
    this.precedence_ = precedence;
    this.associativity_ = associativity;
  }

  /**
   * Returns `true` if this operator is not preceded by the given operator in
   * an infix expression, and `false` otherwise.
   *
   * @param {Operator} operator The operator that may be preceded by this
   *     operator.
   * @returns {boolean} `true` if this operator is not preceded by the given
   *     operator, and `false` otherwise.
   * @private
   */
  isNotPreceding_(operator) {
    return (
      (this.associativity_ === "left" &&
        this.precedence_ <= operator.precedence_) ||
      (this.associativity_ === "right" &&
        this.precedence_ < operator.precedence_)
    );
  }

  /**
   * Returns `true` if this operator is a left parenthesis, and `false`
   * otherwise.
   *
   * @returns {boolean} `true` if this operator is a left parenthesis, and
   *     `false` otherwise.
   * @private
   */
  isLeftParenthesis_() {
    return this.symbol === "(";
  }

  /**
   * Returns `true` if this operator is a right parenthesis, and `false`
   * otherwise.
   *
   * @returns {boolean} `true` if this operator is a right parenthesis, and
   *     `false` otherwise.
   * @private
   */
  isRightParenthesis_() {
    return this.symbol === ")";
  }

  /**
   * Returns a string representation of this operator.
   *
   * @returns {string} A string representation of this operator.
   */
  toString() {
    return this.symbol;
  }
}

/**
 * Class for keeping track of all possible operators in an infix
 * expression and providing a method for getting an operator by its
 * symbol.
 */
class Operators {
  /**
   * Creates a new Operators instance.
   */
  constructor() {
    /**
     * An array of all possible operators in an infix expression.
     *
     * @type {Array<Operator>}
     */
    this.operators = [
      new Operator("(", 1, ""), // Left parenthesis
      new Operator(")", 1, ""), // Right parenthesis
      new Operator("+", 2, "left"), // Addition
      new Operator("-", 2, "left"), // Subtraction
      new Operator("*", 3, "left"), // Multiplication
      new Operator("/", 3, "left"), // Division
      new Operator("^", 4, "left"), // Exponentiation
      new Operator("s", 5, "left"), // Sine
      new Operator("c", 5, "left"), // Cosine

      new Operator("t", 5, "left"), // Tangent
      new Operator("√", 5, "left"), // Square root
      new Operator("q", 5, "left"), // Ctangent
    ];
  }

  /**
   * Returns the operator with the given symbol or `null` if there is no
   * operator with that symbol.
   *
   * @param {string} operatorSymbol The symbol of the operator to get.
   * @returns {?Operator} The operator with the given symbol or `null` if
   *     there is no operator with that symbol.
   */
  getOperator_(operatorSymbol) {
    const filteredOperators = this.operators.filter(
      (findOperator) => findOperator.symbol === operatorSymbol
    );
    return filteredOperators.length ? filteredOperators[0] : null;
  }
}

/**
 * Converts infix expression to postfix (RPN) notation.
 *
 * @param {string} expression - The infix expression.
 * @returns {string} The postfix (RPN) notation of the expression.
 */
const toPostfix = (expression) => {
  // Remove whitespaces and split into tokens
  const tokens = expression.replace(/\s+/g, "").split("");

  // A stack to keep track of the currently open parentheses
  const stack = [];

  // Operators are objects with operator symbols, precedence, and
  // associativity. This object keeps track of all the possible operators.
  const operators = new Operators();

  // The output of the conversion.
  const output = [];

  // A flag to keep track if the previous token was a number or not.
  let isNum = false;

  // Iterate through each token
  tokens.forEach((token) => {
    // Get the corresponding operator object from the operators object.
    const operator = operators.getOperator_(token);

    // If the token is not an operator (i.e. it is a number),
    if (!operator) {
      // If the previous token was also a number
      if (isNum) {
        // Append the token to the last number in the output array
        output[output.length - 1] += token;
      } else {
        // Otherwise, push the token to the output array.
        output.push(token);
      }

      // Set the flag to indicate that the last token was a number.
      isNum = true;

      // If the token is an operator (i.e. it is not a number),
    } else {
      // Set the flag to indicate that the last token was not a number.
      isNum = false;

      // If the operator is a left parenthesis, push it to the stack.
      if (operator.isLeftParenthesis_()) {
        stack.push(operator);

        // If the operator is a right parenthesis,
      } else if (operator.isRightParenthesis_()) {
        // While there are still operators in the stack and the top operator is
        // not a left parenthesis, pop operators from the stack and add them
        // to the output array.
        while (stack.length && !stack[stack.length - 1].isLeftParenthesis_()) {
          output.push(stack.pop());
        }

        // Pop the left parenthesis from the stack and discard it.
        stack.pop();

        // If the operator is not a parentheses,
      } else {
        // While there are still operators in the stack and the top operator has
        // a higher precedence than the current operator,
        while (
          stack.length &&
          operator.isNotPreceding_(stack[stack.length - 1])
        ) {
          // Pop operators from the stack and add them to the output array.
          output.push(stack.pop());
        }

        // Push the current operator to the stack.
        stack.push(operator);
      }
    }
  });

  // While there are still operators in the stack,
  while (stack.length) {
    // Pop operators from the stack and add them to the output array.
    output.push(stack.pop());
  }

  // Return the output array joined into a string with spaces as separators.
  return output.join(" ");
};

/**
 * Evaluates a reverse Polish notation (RPN) expression.
 *
 * @param {string} expression - The RPN expression.
 * @returns {number} The result of the expression.
 */
const calculateExpression = (expression) => {
  // Split the expression into tokens (numbers and operations)
  const tokens = expression.split(" ");

  /**
   * A stack to keep track of the currently processed numbers.
   * @type {Array.<number>}
   */
  const stack = [];

  // Iterate through each token
  for (const token of tokens) {
    if (!isNaN(token)) {
      // If the token is a number, push it to the stack
      stack.push(parseFloat(token));
    } else {
      // If the token is an operation, perform it
      const operand1 = stack.pop(); // First operand
      const operand2 = stack.pop(); // Second operand

      /**
       * Perform the appropriate operation based on the token.
       * @type {number}
       */
      let result;
      switch (token) {
        case "+":
          result = operand1 + operand2;
          break;
        case "-":
          result = operand1 - operand2;
          break;
        case "*":
          result = operand1 * operand2;
          break;
        case "/":
          result = operand1 / operand2;
          break;
        case "^":
          result = Math.pow(operand1, operand2);
          break;
        case "s":
          result = Math.sin(operand1);
          break;
        case "c":
          result = Math.cos(operand1);
          break;
        case "t":
          result = Math.tan(operand1);
          break;
        case "√":
          result = Math.sqrt(operand1);
          break;
        case "q":
          result = 1 / Math.tan(operand1);
          break;
        default:
          throw new Error("Unknown operation: " + token);
      }

      stack.push(result); // Push the result back to the stack
    }
  }

  // The last number in the stack is the result of the expression
  return stack.pop();
};

/**
 * Calculates the result of the expression in the display element.
 *
 * Gets the expression from the display element, converts it to
 * Reverse Polish notation and then evaluates it.
 */
const calculator = () => {
  // Get the expression from the display element
  const expression = document.getElementById("display").value;

  // Replace common trigonometric functions with their symbols
  // accepted by the calculator
  const expressionInRpn = expression
    .replace(/sin/g, "s")
    .replace(/cos/g, "c")
    .replace(/tan/g, "t")
    .replace(/sqrt/g, "√")
    .replace(/ctg/g, "q")
    .replace(/π/g, "3.14")
    .replace(/e/g, "2.71");

  // Convert the expression to Reverse Polish notation
  const rpnExpression = toPostfix(expressionInRpn);

  // Evaluate the expression in Reverse Polish notation
  const result = calculateExpression(rpnExpression);

  // Set the result in the display element
  document.getElementById("display").value = result;
};
