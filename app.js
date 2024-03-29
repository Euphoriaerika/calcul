// function to switch theme
check.onclick = () => {
  document.body.classList.toggle("dark-theme");
};

// function load animation
setTimeout(() => {
  document.querySelector(".circle").classList.add("hidden");
  document.getElementById("calc-page").classList.remove("hidden");
}, 0);

// function to swap operation
const swapOp = () => {
  const swapElements = document.querySelectorAll(".swap");
  // toggle hidden class for all swap elements
  swapElements.forEach((element) => {
    element.classList.toggle("hidden");
  });

  // update swap button name
  const swapBtn = document.getElementById("swap-btn");
  swapBtn.value = swapBtn.value === "T" ? "A" : "T";
};

// function to update the input value
const appendToDisplay = (value) => {
  document.getElementById("display").value += value;
};

// function to clear the input value
const clearDisplay = () => {
  document.getElementById("display").value = "";
};

// function to delete the last character
const backSpace = () => {
  document.getElementById("display").value = document
    .getElementById("display")
    .value.slice(0, -1);
};

// function to calculate the expression
const calculate = () => {
  const expression = document
    .getElementById("display")
    .value.replace("--", "+")
    .replace("++", "+")
    .replace("sin(", "Math.sin(")
    .replace("cos(", "Math.cos(")
    .replace("tan(", "Math.tan(")
    .replace("sqrt(", "Math.sqrt(")
    .replace("^", "**")
    .replace("π", "Math.PI")
    .replace("e", "Math.E");

  var result = "";
  try {
    result = eval(expression);
  } catch (e) {
    alert(`Error: ${e}`);
  } finally {
    document.getElementById("display").value = result;
  }
};
