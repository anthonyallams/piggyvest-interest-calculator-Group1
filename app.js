// UI Elements
const form = document.querySelector("form");
const amount = document.querySelector(".amount");
const interest = document.querySelector(".interest");
const balance = document.querySelector(".balance");
const results = document.querySelector(".results");
const loader = document.querySelector(".loader");
const duration = document.querySelector(".duration");

// Function to Show spinner when user clicks "submit" button
const showLoader = (e) => {
  e.preventDefault();

  loader.style.display = "block";
  balance.style.display = "none";

  setTimeout(calculateResult, 2000);
};

// Function to show error when user does not enter valid data
const showError = (errorMsg) => {
  // Create error div and append to DOM
  const element = document.createElement("div");
  element.className = "error";
  element.appendChild(document.createTextNode(errorMsg));

  //   const header = document.querySelector(".header");
  //   const h1 = document.querySelector("h1-interest");
  //   const form = document.querySelector()
  const firstElement = document.querySelector(".first-element");

  form.insertBefore(element, firstElement);
  loader.style.display = "none";

  setTimeout(clearError, 2000);
};

// Function to clear Error Message
const clearError = () => {
  document.querySelector(".error").remove();
};

// Hardcoded values for the duration to interest rate ratio
let obj = {
  6: 0.082,
  8: 0.164,
  10: 1,
  13: 2,
  40: 3,
};

// Function to Calculate the Loan and display result
const calculateResult = () => {
  // User entered form details
  const Principal = parseFloat(amount.value);
  const Interest = parseFloat(interest.value / 100);
  const Payment = parseFloat(obj[duration.value] * 12);
  console.log(Payment);
  // Check if the entered value is finite
  if (isFinite(Principal)) {
    let InterestOnPrincipal = (Principal * Interest).toFixed(2);
    let totalPayment = Principal + Number(InterestOnPrincipal);

    //Display
    balance.style.display = "block";
    results.innerText = totalPayment.toLocaleString("en", {
      maximumFractionDigits: 2,
    });
    loader.style.display = "none";
  } else {
    showError("Please check your numbers");
  }
};

// Function to sync duration to interest
const syncValues = (e) => {
  const result = parseInt(e.target.value);
  console.log(typeof result);

  interest.value = result;
};

// Event Listener
duration.addEventListener("input", syncValues);
form.addEventListener("submit", showLoader);
