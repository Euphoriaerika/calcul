// function to switch theme
check.onclick = () => {
  document.body.classList.toggle("dark-theme");
};

// function load animation
setTimeout(() => {
  document.querySelector(".circle").classList.add("hidden");
  document.getElementById("calc-page").classList.remove("hidden");
}, 4500);

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
